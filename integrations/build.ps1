# Script that runs simple tests or full integration tests based on $env:TEST_SUITE


# Clean previous builds
Remove-Item "$env:APPVEYOR_BUILD_FOLDER\tmp"  -Force  -Recurse -ErrorAction SilentlyContinue

function buildLibProject
{
  $LIB_FOLDER="$env:APPVEYOR_BUILD_FOLDER\tmp\my-ngx-library-$($args[0])"
  $YO_RC="$env:APPVEYOR_BUILD_FOLDER\integrations\.yo-rc.$($args[0]).json"

  Write-Output Set-Location""
  Write-Output Set-Location"#########################################"
  Write-Output Set-Location"        Integration Test for $($args[0])         "
  Write-Output Set-Location"#########################################"
  Write-Output ""

  Write-Output "#1 - Creating lib folder at '"+$LIB_FOLDER+"'"
  New-Item  $LIB_FOLDER -Type directory

  Write-Output "#2 - Copying .yo-rc.json to lib folder"
  Copy-Item $YO_RC  "$LIB_FOLDER/.yo-rc.json"

  Write-Output "#3 - Moving to lib folder"
  Set-Location $LIB_FOLDER

  Write-Output "#4 - Running generator for '$1'"
  yo ngx-library

  Write-Output "#5 - Building library for '$1'"
  gulp build

  Write-Output "#6 - Moving back to root folder"
  Set-Location ..\..
}

function runUnitTests
{
  Write-Output ""
  Write-Output "#########################################"
  Write-Output "              Unit Tests                 "
  Write-Output "#########################################"
  Write-Output ""
  # Simply run unit tests
  gulp coveralls
}

function runIntegrationTests
{
  # Building and testing library project
  buildLibProject $args[0]
}


switch ($env:TEST_SUITE) 
{
  "units"              { runUnitTests }
  "integrations:ng2"   { runIntegrationTests "ng2" }
  "integrations:ng4"   { runIntegrationTests "ng4" }
  "integrations:ng5"   { runIntegrationTests "ng5" }
  "integrations:ng6"   { runIntegrationTests "ng6" }
  default              { Throw "Unknown value for 'TEST_SUITE': '$env:TEST_SUITE'. Aborting" }
}

