#!/bin/sh

# Script that runs simple tests or full integration tests based on $TEST_SUITE

# The script should immediately exit if any command in the script fails.
set -e

# Clean previous builds
rm -rf tmp

buildLibProject(){
  LIB_FOLDER="tmp/my-ngx-library-$1"
  YO_RC="integrations/.yo-rc.$1.json"

 printf "\\n"
 printf "#########################################\\n"
 printf "        Integration Test for %s          \\n" "$1"
 printf "#########################################\\n"

  echo  "#1 - Creating lib folder at '$LIB_FOLDER'"
  mkdir -p "$LIB_FOLDER"

  echo "#2 - Copying .yo-rc.json to lib folder"
  cp "$YO_RC"  "$LIB_FOLDER/.yo-rc.json"

  echo "#3 - Moving to lib folder"
  cd "$LIB_FOLDER"

  echo "#4 - Running generator for '$1'"
  yo ngx-library

  echo "#5 - Building library for '$1'"
  gulp build

  echo "#6 - Moving back to root folder"
  cd ../..
}

runUnitTests(){
  printf "\\n"
  printf "#########################################\\n"
  printf "              Unit Tests                 \\n"
  printf "#########################################\\n"
  # Simply run unit tests
  gulp coveralls
}

runIntegrationTests(){
  # Building and testing library project
  buildLibProject "$1"
}
# Use 1st param id defined, or fallback to env var TEST_SUITE
#!/bin/sh
SUITE="$1"
if [ -z "$SUITE" ] ; then
  SUITE="$TEST_SUITE"
fi

case $SUITE in
  "units")              runUnitTests ;;
  "integrations:ng2")   runIntegrationTests "ng2" ;;
  "integrations:ng4")   runIntegrationTests "ng4" ;;
  "integrations:ng5")   runIntegrationTests "ng5" ;;
  "integrations:ng6")   runIntegrationTests "ng6" ;;
  *)                    echo "Unknown value for 'TEST_SUITE': '$SUITE'. Aborting"
                        exit 1 ;;
esac

exit 0
