<#
.SYNOPSIS
Validates and synchronizes the twelve documented work items with the existing GitHub Project #1.

.DESCRIPTION
Run with -ValidateWorkItemsOnly for local validation, -WhatIf for a remote preview, or -Apply after receiving approval for GitHub writes. The script never creates a GitHub Project.
#>
[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'Medium')]
param(
  [switch]$ValidateWorkItemsOnly,
  [switch]$Apply
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$Repository = 'alejandrovc23/wdd430-team05'
$RequiredAccount = 'alejandrovc23'
$ProjectOwner = 'alejandrovc23'
$ProjectNumber = 1
$ExpectedProjectTitle = 'Handcrafted Haven ' + [char]0x2013 + ' Team 05'
$RepositoryRoot = Split-Path -Parent $PSScriptRoot
$WorkItemsPath = Join-Path $RepositoryRoot 'docs/work-items.md'

$ExpectedTitles = @(
  'Initialize the Next.js project and shared application layout',
  'Create the responsive global navigation',
  'Build the product catalog page',
  'Add product category, price, and sorting controls',
  'Build the product detail page',
  'Implement user authentication',
  'Create authenticated seller profiles',
  'Build seller product management',
  'Add product ratings and written reviews',
  'Design the database schema and data-access layer',
  'Perform accessibility, validation, performance, usability, and SEO review',
  'Deploy Handcrafted Haven to Vercel'
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

function ConvertFrom-GhJson {
  param(
    [Parameter(Mandatory = $true)]$Result,
    [Parameter(Mandatory = $true)][string]$Operation
  )

  Assert-GhSuccess -Result $Result -Operation $Operation
  if ([string]::IsNullOrWhiteSpace($Result.Output)) {
    throw "$Operation returned no JSON."
  }

  try {
    return $Result.Output | ConvertFrom-Json
  }
  catch {
    throw "$Operation returned invalid JSON. $($_.Exception.Message)"
  }
}

function Get-SectionValue {
  param(
    [Parameter(Mandatory = $true)][string]$Body,
    [Parameter(Mandatory = $true)][string]$Heading
  )

  $escapedHeading = [regex]::Escape($Heading)
  $match = [regex]::Match(
    $Body,
    "(?ms)^###[ \t]+$escapedHeading[ \t]*\r?\n(?<value>.*?)(?=^###[ \t]+|\z)"
  )

  if (-not $match.Success) {
    throw "A work item is missing the '$Heading' section."
  }

  return $match.Groups['value'].Value.Trim()
}

function Read-WorkItems {
  param(
    [Parameter(Mandatory = $true)][string]$Path
  )

  if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
    throw "The work-item source file was not found: $Path"
  }

  $document = [System.IO.File]::ReadAllText($Path)
  $itemMatches = [regex]::Matches(
    $document,
    '(?ms)^##[ \t]+(?<number>\d+)\.[ \t]+(?<title>[^\r\n]+?)[ \t]*\r?\n(?<body>.*?)(?=^##[ \t]+\d+\.[ \t]+|\z)'
  )

  if ($itemMatches.Count -ne $ExpectedTitles.Count) {
    throw "Expected exactly $($ExpectedTitles.Count) numbered work items in '$Path', but found $($itemMatches.Count)."
  }

  $workItems = @()

  for ($index = 0; $index -lt $itemMatches.Count; $index++) {
    $match = $itemMatches[$index]
    $expectedNumber = $index + 1
    $actualNumber = [int]$match.Groups['number'].Value
    $title = $match.Groups['title'].Value.Trim()
    $body = $match.Groups['body'].Value.Trim()

    if ($actualNumber -ne $expectedNumber) {
      throw "Expected work item number $expectedNumber, but found $actualNumber."
    }

    if ($title -cne $ExpectedTitles[$index]) {
      throw "Work item $expectedNumber must have the exact title '$($ExpectedTitles[$index])'; found '$title'."
    }

    $userStory = Get-SectionValue -Body $body -Heading 'User Story'
    $description = Get-SectionValue -Body $body -Heading 'Description'
    $acceptanceCriteria = Get-SectionValue -Body $body -Heading 'Acceptance Criteria'
    $priority = Get-SectionValue -Body $body -Heading 'Priority'
    $initialStatus = Get-SectionValue -Body $body -Heading 'Initial Status'
    $suggestedLabels = Get-SectionValue -Body $body -Heading 'Suggested Labels'

    $normalizedStory = ($userStory -replace '\s+', ' ').Trim()
    if ($normalizedStory -notmatch '^As (?:a|an) .+, I want .+ so that .+\.$') {
      throw "Work item $expectedNumber does not contain a complete user story in the required format."
    }

    if ($description.Trim().Length -lt 40) {
      throw "Work item $expectedNumber must have a meaningful description of at least 40 characters."
    }

    $criterionCount = [regex]::Matches(
      $acceptanceCriteria,
      '(?m)^[ \t]*-[ \t]+\[[ xX]\][ \t]+\S.*$'
    ).Count
    if ($criterionCount -lt 3) {
      throw "Work item $expectedNumber must have at least three checkbox acceptance criteria."
    }

    if ($priority -cnotin @('High', 'Medium', 'Low')) {
      throw "Work item $expectedNumber has an invalid priority '$priority'."
    }

    $allowedStatuses = if ($expectedNumber -eq 1) { @('Backlog', 'Done') } else { @('Backlog') }
    if ($initialStatus -cnotin $allowedStatuses) {
      throw "Work item $expectedNumber has an invalid initial status '$initialStatus'."
    }

    if ([string]::IsNullOrWhiteSpace($suggestedLabels)) {
      throw "Work item $expectedNumber must include at least one suggested label."
    }

    $issueBody = [regex]::Replace($body, '(?m)^###[ \t]+', '## ')
    $workItems += [pscustomobject]@{
      Number = $expectedNumber
      Title = $title
      Body = $issueBody
    }
  }

  return $workItems
}

function Get-ProjectItems {
  $result = Invoke-Gh -Arguments @(
    'project', 'item-list', $ProjectNumber.ToString(),
    '--owner', $ProjectOwner,
    '--limit', '1000',
    '--format', 'json'
  )
  $document = ConvertFrom-GhJson -Result $result -Operation 'Listing Project #1 items'

  $itemsProperty = $document.PSObject.Properties['items']
  if ($null -eq $itemsProperty) {
    throw 'The GitHub Project item-list response did not contain an items collection.'
  }

  return @($itemsProperty.Value)
}

function Get-ProjectItemDetails {
  param([Parameter(Mandatory = $true)]$Item)

  $title = $null
  $url = $null
  $itemTitleProperty = $Item.PSObject.Properties['title']
  if ($null -ne $itemTitleProperty) {
    $title = [string]$itemTitleProperty.Value
  }

  $contentProperty = $Item.PSObject.Properties['content']
  if ($null -ne $contentProperty -and $null -ne $contentProperty.Value) {
    $content = $contentProperty.Value
    $contentTitleProperty = $content.PSObject.Properties['title']
    $contentUrlProperty = $content.PSObject.Properties['url']
    if ([string]::IsNullOrWhiteSpace($title) -and $null -ne $contentTitleProperty) {
      $title = [string]$contentTitleProperty.Value
    }
    if ($null -ne $contentUrlProperty) {
      $url = [string]$contentUrlProperty.Value
    }
  }

  [pscustomobject]@{ Title = $title; Url = $url }
}

function Get-AllIssues {
  $result = Invoke-Gh -Arguments @(
    'issue', 'list',
    '--repo', $Repository,
    '--state', 'all',
    '--limit', '1000',
    '--json', 'number,title,url,state,body'
  )
  $parsedIssues = ConvertFrom-GhJson -Result $result -Operation "Listing issues for $Repository"
  return @($parsedIssues)
}

function Test-DetailedIssueBody {
  param(
    [AllowEmptyString()][string]$Body,
    [Parameter(Mandatory = $true)][int]$ExpectedNumber
  )

  if ([string]::IsNullOrWhiteSpace($Body)) {
    return $false
  }

  $sections = @{}
  foreach ($heading in @('User Story', 'Description', 'Acceptance Criteria', 'Priority', 'Initial Status', 'Suggested Labels')) {
    $match = [regex]::Match(
      $Body,
      "(?ms)^##[ \t]+$([regex]::Escape($heading))[ \t]*\r?\n(?<value>.*?)(?=^##[ \t]+|\z)"
    )
    if (-not $match.Success -or [string]::IsNullOrWhiteSpace($match.Groups['value'].Value)) {
      return $false
    }
    $sections[$heading] = $match.Groups['value'].Value.Trim()
  }

  $normalizedStory = ($sections['User Story'] -replace '\s+', ' ').Trim()
  if ($normalizedStory -notmatch '^As (?:a|an) .+, I want .+ so that .+\.$') {
    return $false
  }

  if ($sections['Description'].Length -lt 40) {
    return $false
  }

  $criterionCount = [regex]::Matches(
    $sections['Acceptance Criteria'],
    '(?m)^[ \t]*-[ \t]+\[[ xX]\][ \t]+\S.*$'
  ).Count

  $allowedStatuses = if ($ExpectedNumber -eq 1) { @('Backlog', 'Done') } else { @('Backlog') }

  return (
    $criterionCount -ge 3 -and
    $sections['Priority'] -cin @('High', 'Medium', 'Low') -and
    $sections['Initial Status'] -cin $allowedStatuses
  )
}

function Get-ExactIssue {
  param(
    [Parameter(Mandatory = $true)][AllowEmptyCollection()][object[]]$Issues,
    [Parameter(Mandatory = $true)][string]$Title
  )

  return @(
    $Issues | Where-Object {
      $null -ne $_ -and
      $null -ne $_.PSObject.Properties['title'] -and
      [string]$_.title -ceq $Title
    }
  )
}

$existingIssues = New-Object System.Collections.Generic.List[string]
$createdIssues = New-Object System.Collections.Generic.List[string]
$addedProjectItems = New-Object System.Collections.Generic.List[string]
$existingProjectItems = New-Object System.Collections.Generic.List[string]
$errors = New-Object System.Collections.Generic.List[string]
$creationCandidates = @{}
$additionCandidates = @{}
$whatIfMissingIssues = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::Ordinal)
$projectUrl = $null
$issueListingCompleted = $false
$projectItemListingCompleted = $false

try {
  $workItems = @(Read-WorkItems -Path $WorkItemsPath)

  if ($ValidateWorkItemsOnly) {
    Write-Output "Validated $($workItems.Count) detailed work items in '$WorkItemsPath'."
    return
  }

  if (-not $Apply -and -not $WhatIfPreference) {
    throw 'No GitHub changes were requested. Review the work items, then rerun with -Apply after receiving approval.'
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

  $repositoryResult = Invoke-Gh -Arguments @(
    'repo', 'view', $Repository,
    '--json', 'nameWithOwner,url'
  )
  $repositoryData = ConvertFrom-GhJson -Result $repositoryResult -Operation "Verifying access to $Repository"
  if ([string]$repositoryData.nameWithOwner -cne $Repository) {
    throw "GitHub returned repository '$($repositoryData.nameWithOwner)' instead of '$Repository'."
  }

  $projectResult = Invoke-Gh -Arguments @(
    'project', 'view', $ProjectNumber.ToString(),
    '--owner', $ProjectOwner,
    '--format', 'json'
  )
  $projectData = ConvertFrom-GhJson -Result $projectResult -Operation 'Verifying access to Project #1'
  if ([int]$projectData.number -ne $ProjectNumber) {
    throw "GitHub returned Project #$($projectData.number) instead of Project #$ProjectNumber."
  }
  if ([string]$projectData.title -cne $ExpectedProjectTitle) {
    throw "Project #$ProjectNumber is titled '$($projectData.title)', not '$ExpectedProjectTitle'. No project was created or modified."
  }
  $projectUrl = [string]$projectData.url
  if ([string]::IsNullOrWhiteSpace($projectUrl)) {
    throw 'Project #1 did not return a project URL.'
  }

  $initialIssues = @(Get-AllIssues)
  $issueListingCompleted = $true
  foreach ($workItem in $workItems) {
    $matchingIssues = @(Get-ExactIssue -Issues $initialIssues -Title $workItem.Title)
    if ($matchingIssues.Count -gt 1) {
      throw "Multiple issues already have the exact title '$($workItem.Title)'. Resolve the duplicate issues before running this script."
    }
    if ($matchingIssues.Count -eq 1 -and -not (Test-DetailedIssueBody -Body ([string]$matchingIssues[0].body) -ExpectedNumber $workItem.Number)) {
      throw "Existing issue #$($matchingIssues[0].number) '$($workItem.Title)' does not contain every required section, meaningful content, and at least three acceptance criteria."
    }
  }

  foreach ($workItem in $workItems) {
    $matchingIssues = @(Get-ExactIssue -Issues $initialIssues -Title $workItem.Title)
    if ($matchingIssues.Count -eq 1) {
      $issue = $matchingIssues[0]
      $existingIssues.Add("#$($issue.number) $($workItem.Title)")
      continue
    }

    if (-not $PSCmdlet.ShouldProcess("$Repository issue '$($workItem.Title)'", 'Create missing issue')) {
      if ($WhatIfPreference) {
        [void]$whatIfMissingIssues.Add($workItem.Title)
      }
      else {
        $errors.Add("Creation of issue '$($workItem.Title)' was not confirmed.")
      }
      continue
    }

    $createResult = Invoke-Gh -Arguments @(
      'issue', 'create',
      '--repo', $Repository,
      '--title', $workItem.Title,
      '--body', $workItem.Body
    )

    if ($createResult.ExitCode -ne 0) {
      $errors.Add("Creating issue '$($workItem.Title)' failed. $($createResult.Output)")
      continue
    }

    $urlMatch = [regex]::Match(
      $createResult.Output,
      '(?m)^https://github\.com/alejandrovc23/wdd430-team05/issues/\d+/?$'
    )
    if (-not $urlMatch.Success) {
      $errors.Add("GitHub reported success for '$($workItem.Title)' but did not return a recognizable issue URL; the result requires manual verification.")
      continue
    }

    $creationCandidates[$workItem.Title] = $urlMatch.Value.TrimEnd('/')
  }

  $verifiedIssues = @(Get-AllIssues)
  $issueByTitle = @{}
  foreach ($workItem in $workItems) {
    $matchingIssues = @(Get-ExactIssue -Issues $verifiedIssues -Title $workItem.Title)
    if ($matchingIssues.Count -ne 1) {
      if ($WhatIfPreference -and $whatIfMissingIssues.Contains($workItem.Title)) {
        continue
      }
      $errors.Add("Expected one verified issue titled '$($workItem.Title)' after synchronization; found $($matchingIssues.Count).")
      continue
    }

    $issue = $matchingIssues[0]
    $issueByTitle[$workItem.Title] = $issue
    if ($creationCandidates.ContainsKey($workItem.Title)) {
      $expectedUrl = [string]$creationCandidates[$workItem.Title]
      $actualUrl = ([string]$issue.url).TrimEnd('/')
      if ($actualUrl -ceq $expectedUrl) {
        $createdIssues.Add("#$($issue.number) $($workItem.Title)")
      }
      else {
        $errors.Add("The created URL for '$($workItem.Title)' did not match the issue returned during verification.")
      }
    }
  }

  $initialProjectItems = @(Get-ProjectItems)
  $projectItemListingCompleted = $true
  $projectIssueUrls = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)
  foreach ($projectItem in $initialProjectItems) {
    $details = Get-ProjectItemDetails -Item $projectItem
    if (-not [string]::IsNullOrWhiteSpace($details.Url)) {
      [void]$projectIssueUrls.Add($details.Url.TrimEnd('/'))
    }
  }

  foreach ($workItem in $workItems) {
    if (-not $issueByTitle.ContainsKey($workItem.Title)) {
      continue
    }

    $issue = $issueByTitle[$workItem.Title]
    $issueUrl = ([string]$issue.url).TrimEnd('/')
    if ($projectIssueUrls.Contains($issueUrl)) {
      $existingProjectItems.Add($workItem.Title)
      continue
    }

    if (-not $PSCmdlet.ShouldProcess("Project #$ProjectNumber", "Add issue '$($workItem.Title)'")) {
      if (-not $WhatIfPreference) {
        $errors.Add("Adding '$($workItem.Title)' to Project #$ProjectNumber was not confirmed.")
      }
      continue
    }

    $addResult = Invoke-Gh -Arguments @(
      'project', 'item-add', $ProjectNumber.ToString(),
      '--owner', $ProjectOwner,
      '--url', $issueUrl
    )
    if ($addResult.ExitCode -ne 0) {
      $errors.Add("Adding '$($workItem.Title)' to Project #$ProjectNumber failed. $($addResult.Output)")
      continue
    }

    $additionCandidates[$workItem.Title] = $issueUrl
    [void]$projectIssueUrls.Add($issueUrl)
  }

  if (-not $WhatIfPreference) {
    $verifiedProjectItems = @(Get-ProjectItems)
    $verifiedProjectUrls = New-Object 'System.Collections.Generic.HashSet[string]' ([System.StringComparer]::OrdinalIgnoreCase)
    foreach ($projectItem in $verifiedProjectItems) {
      $details = Get-ProjectItemDetails -Item $projectItem
      if (-not [string]::IsNullOrWhiteSpace($details.Url)) {
        [void]$verifiedProjectUrls.Add($details.Url.TrimEnd('/'))
      }
    }

    foreach ($workItem in $workItems) {
      if (-not $issueByTitle.ContainsKey($workItem.Title)) {
        continue
      }

      $issueUrl = ([string]$issueByTitle[$workItem.Title].url).TrimEnd('/')
      if (-not $verifiedProjectUrls.Contains($issueUrl)) {
        $errors.Add("Project verification did not find '$($workItem.Title)'.")
      }
      elseif ($additionCandidates.ContainsKey($workItem.Title)) {
        $addedProjectItems.Add($workItem.Title)
      }
    }
  }
}
catch {
  $errors.Add($_.Exception.Message)
}

Write-Output ''
Write-Output 'GitHub Project setup summary'
if ($issueListingCompleted) {
  Write-Output "Existing issues: $($existingIssues.Count)"
  $existingIssues | ForEach-Object { Write-Output "  - $_" }
}
else {
  Write-Output 'Existing issues: not verified'
}
Write-Output "Created issues: $($createdIssues.Count)"
$createdIssues | ForEach-Object { Write-Output "  - $_" }
Write-Output "Added project items: $($addedProjectItems.Count)"
$addedProjectItems | ForEach-Object { Write-Output "  - $_" }
if ($projectItemListingCompleted) {
  Write-Output "Existing project items: $($existingProjectItems.Count)"
  $existingProjectItems | ForEach-Object { Write-Output "  - $_" }
}
else {
  Write-Output 'Existing project items: not verified'
}
Write-Output "Errors: $($errors.Count)"
$errors | ForEach-Object { Write-Output "  - $_" }
if ([string]::IsNullOrWhiteSpace($projectUrl)) {
  Write-Output 'Project URL: not verified'
}
else {
  Write-Output "Project URL: $projectUrl"
}

if ($WhatIfPreference) {
  Write-Output 'What-if mode: no issues or project items were created.'
}

if ($errors.Count -gt 0) {
  exit 1
}
