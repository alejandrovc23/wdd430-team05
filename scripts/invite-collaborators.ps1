<#
.SYNOPSIS
Invites four confirmed teammate accounts to the repository with push access.

.DESCRIPTION
Supply all four exact GitHub usernames only after team confirmation. Use -WhatIf for a remote preview or -Apply after receiving approval. The script validates repository administration, existing collaborators, and pending invitation permissions before requesting changes.
#>
[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'High')]
param(
  [Parameter(Mandatory=$true)]
  [string]$BabatundeUsername,

  [Parameter(Mandatory=$true)]
  [string]$LuckyUsername,

  [Parameter(Mandatory=$true)]
  [string]$EusebioUsername,

  [Parameter(Mandatory=$true)]
  [string]$GerardUsername,

  [switch]$Apply
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$Repository = 'alejandrovc23/wdd430-team05'
$RequiredAccount = 'alejandrovc23'
$RejectedPlaceholders = @(
  'USERNAME',
  'UNKNOWN',
  'TODO',
  'REQUIRES_CONFIRMATION'
)

function Invoke-Gh {
  param(
    [Parameter(Mandatory = $true)]
    [string[]]$Arguments
  )

  $stderrPath = [System.IO.Path]::GetTempFileName()
  $originalOutputEncoding = [Console]::OutputEncoding
  try {
    [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
    $capturedOutput = @(& gh @Arguments 2> $stderrPath)
    $exitCode = $LASTEXITCODE
    $stdoutText = ($capturedOutput | ForEach-Object { $_.ToString() }) -join [Environment]::NewLine
    $stderrText = if ((Get-Item -LiteralPath $stderrPath).Length -gt 0) {
      [System.IO.File]::ReadAllText($stderrPath)
    }
    else {
      ''
    }
  }
  finally {
    [Console]::OutputEncoding = $originalOutputEncoding
    [System.IO.File]::Delete($stderrPath)
  }

  $resultText = if ($exitCode -eq 0) {
    $stdoutText
  }
  else {
    (@($stdoutText, $stderrText) |
      Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
      ForEach-Object { $_.Trim() }) -join [Environment]::NewLine
  }

  [pscustomobject]@{
    ExitCode = $exitCode
    Output = $resultText.Trim()
    Warning = $stderrText.Trim()
  }
}

function Assert-GhSuccess {
  param(
    [Parameter(Mandatory = $true)]$Result,
    [Parameter(Mandatory = $true)][string]$Operation
  )

  if ($Result.ExitCode -ne 0) {
    $details = if ([string]::IsNullOrWhiteSpace($Result.Output)) { 'No error details were returned.' } else { $Result.Output }
    throw "$Operation failed. $details"
  }
}

function Get-FailureKind {
  param([string]$Details)

  if ($Details -match '(?i)(HTTP\s+)?(401|403)\b|forbidden|permission denied|resource not accessible|requires authentication') {
    return 'PermissionDenied'
  }
  if ($Details -match '(?i)(HTTP\s+)?404\b|not found') {
    return 'NotFound'
  }
  return 'Failed'
}

function Test-UsernameInput {
  param(
    [Parameter(Mandatory = $true)][string]$Person,
    [AllowEmptyString()][string]$Username
  )

  $trimmedUsername = $Username.Trim()
  if ([string]::IsNullOrWhiteSpace($trimmedUsername)) {
    throw "$Person's GitHub username cannot be empty."
  }

  foreach ($placeholder in $RejectedPlaceholders) {
    if ($trimmedUsername.Equals($placeholder, [System.StringComparison]::OrdinalIgnoreCase)) {
      throw "$Person's GitHub username cannot be the placeholder '$trimmedUsername'."
    }
  }

  if ($trimmedUsername.Length -gt 39 -or $trimmedUsername -notmatch '^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$') {
    throw "'$trimmedUsername' is not a valid GitHub username format for $Person."
  }

  return $trimmedUsername
}

function Get-PendingInvitations {
  $result = Invoke-Gh -Arguments @(
    'api', '--method', 'GET', '--paginate',
    "repos/$Repository/invitations?per_page=100",
    '--jq', '.[] | [(.id|tostring), .invitee.login, (.permissions // .role_name // "unknown")] | @tsv'
  )
  Assert-GhSuccess -Result $result -Operation 'Listing pending repository invitations'

  $invitations = New-Object 'System.Collections.Generic.Dictionary[string,object]' ([System.StringComparer]::OrdinalIgnoreCase)
  if (-not [string]::IsNullOrWhiteSpace($result.Output)) {
    foreach ($line in ($result.Output -split '\r?\n')) {
      $parts = $line -split "`t", 3
      if ($parts.Count -ne 3 -or [string]::IsNullOrWhiteSpace($parts[1])) {
        throw "GitHub returned an invalid pending-invitation record: '$line'."
      }
      $invitations[$parts[1].Trim()] = [pscustomobject]@{
        Id = $parts[0].Trim()
        Username = $parts[1].Trim()
        Permission = $parts[2].Trim().ToLowerInvariant()
      }
    }
  }
  return ,$invitations
}

function Test-PushPermission {
  param([AllowEmptyString()][string]$Permission)

  return $Permission -in @('write', 'push', 'maintain', 'admin')
}

function Get-CollaboratorState {
  param([Parameter(Mandatory = $true)][string]$Username)

  $result = Invoke-Gh -Arguments @(
    'api', '--method', 'GET',
    "repos/$Repository/collaborators/$Username/permission"
  )

  if ($result.ExitCode -eq 0) {
    try {
      $data = $result.Output | ConvertFrom-Json
      $permission = if ($null -ne $data.PSObject.Properties['role_name']) {
        [string]$data.role_name
      }
      elseif ($null -ne $data.PSObject.Properties['permission']) {
        [string]$data.permission
      }
      else {
        'unknown'
      }
      return [pscustomobject]@{
        State = 'Collaborator'
        Permission = $permission
        Details = $null
      }
    }
    catch {
      return [pscustomobject]@{
        State = 'Failed'
        Permission = $null
        Details = "GitHub returned invalid collaborator JSON for '$Username'. $($_.Exception.Message)"
      }
    }
  }

  $failureKind = Get-FailureKind -Details $result.Output
  if ($failureKind -eq 'NotFound') {
    return [pscustomobject]@{ State = 'Missing'; Permission = $null; Details = $result.Output }
  }
  if ($failureKind -eq 'PermissionDenied') {
    return [pscustomobject]@{ State = 'PermissionDenied'; Permission = $null; Details = $result.Output }
  }
  return [pscustomobject]@{ State = 'Failed'; Permission = $null; Details = $result.Output }
}

function Test-GitHubUser {
  param([Parameter(Mandatory = $true)][string]$Username)

  $result = Invoke-Gh -Arguments @(
    'api', '--method', 'GET', "users/$Username", '--silent'
  )
  if ($result.ExitCode -eq 0) {
    return [pscustomobject]@{ State = 'Exists'; Details = $null }
  }

  $failureKind = Get-FailureKind -Details $result.Output
  return [pscustomobject]@{ State = $failureKind; Details = $result.Output }
}

$alreadyCollaborators = New-Object System.Collections.Generic.List[string]
$createdInvitations = New-Object System.Collections.Generic.List[string]
$updatedInvitations = New-Object System.Collections.Generic.List[string]
$pendingInvitations = New-Object System.Collections.Generic.List[string]
$skippedInvitations = New-Object System.Collections.Generic.List[string]
$usersNotFound = New-Object System.Collections.Generic.List[string]
$permissionDenied = New-Object System.Collections.Generic.List[string]
$failed = New-Object System.Collections.Generic.List[string]
$fatalErrorRecorded = $false
$remoteStateVerified = $false

try {
  $collaborators = @(
    [pscustomobject]@{ Person = 'Babatunde Azeez Adekola'; Username = (Test-UsernameInput -Person 'Babatunde Azeez Adekola' -Username $BabatundeUsername) },
    [pscustomobject]@{ Person = 'Lucky Ayei Inyang Eni'; Username = (Test-UsernameInput -Person 'Lucky Ayei Inyang Eni' -Username $LuckyUsername) },
    [pscustomobject]@{ Person = 'Eusebio Ngoy'; Username = (Test-UsernameInput -Person 'Eusebio Ngoy' -Username $EusebioUsername) },
    [pscustomobject]@{ Person = 'Gerard Alessandro Rodrigues'; Username = (Test-UsernameInput -Person 'Gerard Alessandro Rodrigues' -Username $GerardUsername) }
  )

  $uniqueUsernames = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)
  foreach ($collaborator in $collaborators) {
    if (-not $uniqueUsernames.Add($collaborator.Username)) {
      throw "The GitHub username '$($collaborator.Username)' was supplied for more than one teammate. Each teammate must have a distinct account."
    }
  }

  if (-not $Apply -and -not $WhatIfPreference) {
    throw 'No collaborator changes were requested. Review the usernames, then rerun with -Apply after receiving approval.'
  }

  if ($null -eq (Get-Command gh -ErrorAction SilentlyContinue)) {
    throw 'GitHub CLI (gh) is not installed or is not available on PATH.'
  }

  $authResult = Invoke-Gh -Arguments @('auth', 'status', '--hostname', 'github.com')
  Assert-GhSuccess -Result $authResult -Operation 'Checking GitHub CLI authentication'

  $accountResult = Invoke-Gh -Arguments @('api', 'user', '--jq', '.login')
  Assert-GhSuccess -Result $accountResult -Operation 'Reading the active GitHub account'
  $activeAccount = $accountResult.Output.Trim()
  if ($activeAccount -cne $RequiredAccount) {
    throw "The active GitHub account is '$activeAccount'; '$RequiredAccount' is required."
  }

  $adminResult = Invoke-Gh -Arguments @(
    'api', '--method', 'GET', "repos/$Repository", '--jq', '.permissions.admin'
  )
  if ($adminResult.ExitCode -ne 0) {
    $kind = Get-FailureKind -Details $adminResult.Output
    if ($kind -eq 'PermissionDenied' -or $kind -eq 'NotFound') {
      $permissionDenied.Add("$activeAccount cannot verify administrator access to $Repository. $($adminResult.Output)")
    }
    else {
      $failed.Add("Repository access check failed. $($adminResult.Output)")
    }
    $fatalErrorRecorded = $true
    throw 'Administrator access could not be verified; no invitations were attempted.'
  }
  if ($adminResult.Output.Trim() -cne 'true') {
    $permissionDenied.Add("$activeAccount does not have administrator access to $Repository.")
    $fatalErrorRecorded = $true
    throw 'Administrator access is required; no invitations were attempted.'
  }

  $pendingByUsername = Get-PendingInvitations
  $remoteStateVerified = $true

  foreach ($collaborator in $collaborators) {
    $username = $collaborator.Username
    $person = $collaborator.Person

    $userState = Test-GitHubUser -Username $username
    if ($userState.State -eq 'NotFound') {
      $usersNotFound.Add("$person (@$username)")
      continue
    }
    if ($userState.State -eq 'PermissionDenied') {
      $permissionDenied.Add("Could not verify $person (@$username). $($userState.Details)")
      continue
    }
    if ($userState.State -ne 'Exists') {
      $failed.Add("Could not verify $person (@$username). $($userState.Details)")
      continue
    }

    $collaboratorState = Get-CollaboratorState -Username $username
    if ($collaboratorState.State -eq 'Collaborator') {
      $alreadyCollaborators.Add("$person (@$username; permission: $($collaboratorState.Permission))")
      continue
    }
    if ($collaboratorState.State -eq 'PermissionDenied') {
      $permissionDenied.Add("Could not check collaborator access for $person (@$username). $($collaboratorState.Details)")
      continue
    }
    if ($collaboratorState.State -eq 'Failed') {
      $failed.Add("Could not check collaborator access for $person (@$username). $($collaboratorState.Details)")
      continue
    }

    if ($pendingByUsername.ContainsKey($username)) {
      $pendingInvitation = $pendingByUsername[$username]
      if (Test-PushPermission -Permission $pendingInvitation.Permission) {
        $pendingInvitations.Add("$person (@$username; permission: $($pendingInvitation.Permission))")
        continue
      }

      if (-not $PSCmdlet.ShouldProcess("$person (@$username)", "Upgrade pending invitation to write access")) {
        $skippedInvitations.Add("$person (@$username; pending permission remains $($pendingInvitation.Permission))")
        continue
      }

      $updateResult = Invoke-Gh -Arguments @(
        'api', '--method', 'PATCH',
        "repos/$Repository/invitations/$($pendingInvitation.Id)",
        '--raw-field', 'permissions=write'
      )
      if ($updateResult.ExitCode -ne 0) {
        $kind = Get-FailureKind -Details $updateResult.Output
        if ($kind -eq 'PermissionDenied') {
          $permissionDenied.Add("Updating the invitation for $person (@$username) was denied. $($updateResult.Output)")
        }
        else {
          $failed.Add("Updating the invitation for $person (@$username) failed. $($updateResult.Output)")
        }
        continue
      }

      $refreshedPending = Get-PendingInvitations
      if ($refreshedPending.ContainsKey($username) -and (Test-PushPermission -Permission $refreshedPending[$username].Permission)) {
        $updatedInvitations.Add("$person (@$username; permission: $($refreshedPending[$username].Permission))")
      }
      else {
        $failed.Add("GitHub accepted the permission update for $person (@$username), but write access could not be verified.")
      }
      continue
    }

    if (-not $PSCmdlet.ShouldProcess("$person (@$username)", "Invite to $Repository with push access")) {
      $skippedInvitations.Add("$person (@$username; invitation not confirmed)")
      continue
    }

    $inviteResult = Invoke-Gh -Arguments @(
      'api', '--method', 'PUT',
      "repos/$Repository/collaborators/$username",
      '--raw-field', 'permission=push'
    )
    if ($inviteResult.ExitCode -ne 0) {
      $kind = Get-FailureKind -Details $inviteResult.Output
      if ($kind -eq 'PermissionDenied') {
        $permissionDenied.Add("Invitation for $person (@$username) was denied. $($inviteResult.Output)")
      }
      elseif ($kind -eq 'NotFound') {
        $usersNotFound.Add("$person (@$username)")
      }
      else {
        $failed.Add("Invitation for $person (@$username) failed. $($inviteResult.Output)")
      }
      continue
    }

    try {
      $refreshedPendingByUsername = Get-PendingInvitations
      if ($refreshedPendingByUsername.ContainsKey($username) -and (Test-PushPermission -Permission $refreshedPendingByUsername[$username].Permission)) {
        $createdInvitations.Add("$person (@$username; push access requested)")
        $pendingByUsername[$username] = $refreshedPendingByUsername[$username]
        continue
      }

      $verifiedCollaboratorState = Get-CollaboratorState -Username $username
      if ($verifiedCollaboratorState.State -eq 'Collaborator') {
        $alreadyCollaborators.Add("$person (@$username; permission: $($verifiedCollaboratorState.Permission))")
      }
      else {
        $failed.Add("GitHub accepted the request for $person (@$username), but neither collaborator access nor a pending invitation could be verified.")
      }
    }
    catch {
      $failed.Add("GitHub accepted the request for $person (@$username), but verification failed. $($_.Exception.Message)")
    }
  }
}
catch {
  if (-not $fatalErrorRecorded) {
    $failed.Add($_.Exception.Message)
  }
}

Write-Output ''
Write-Output 'Collaborator invitation summary'
if ($remoteStateVerified) {
  Write-Output "Already collaborator: $($alreadyCollaborators.Count)"
  $alreadyCollaborators | ForEach-Object { Write-Output "  - $_" }
}
else {
  Write-Output 'Already collaborator: not verified'
}
Write-Output "Invitation created: $($createdInvitations.Count)"
$createdInvitations | ForEach-Object { Write-Output "  - $_" }
Write-Output "Invitation updated: $($updatedInvitations.Count)"
$updatedInvitations | ForEach-Object { Write-Output "  - $_" }
if ($remoteStateVerified) {
  Write-Output "Invitation pending: $($pendingInvitations.Count)"
  $pendingInvitations | ForEach-Object { Write-Output "  - $_" }
  Write-Output "User not found: $($usersNotFound.Count)"
  $usersNotFound | ForEach-Object { Write-Output "  - $_" }
}
else {
  Write-Output 'Invitation pending: not verified'
  Write-Output 'User not found: not verified'
}
Write-Output "Skipped: $($skippedInvitations.Count)"
$skippedInvitations | ForEach-Object { Write-Output "  - $_" }
Write-Output "Permission denied: $($permissionDenied.Count)"
$permissionDenied | ForEach-Object { Write-Output "  - $_" }
Write-Output "Failed: $($failed.Count)"
$failed | ForEach-Object { Write-Output "  - $_" }

if ($WhatIfPreference) {
  Write-Output 'What-if mode: no invitations were created.'
}

if (
  $usersNotFound.Count -gt 0 -or
  $permissionDenied.Count -gt 0 -or
  $failed.Count -gt 0 -or
  ($skippedInvitations.Count -gt 0 -and -not $WhatIfPreference)
) {
  exit 1
}
