if [[ -z "${1}" ]]
then
  echo "version is not passed"
  exit -1
else
  echo "bump to version ${1}"
fi

sed -i '' -E "s/\"version\": \"[^\"]*\"/\"version\": \"$1\"/g" packages/xicons-utils/package.json
sed -i '' -E "s/\"version\": \"[^\"]*\"/\"version\": \"$1\"/g" packages/vicons-utils/package.json
sed -i '' -E "s/\"version\": \"[^\"]*\"/\"version\": \"$1\"/g" packages/v2icons-utils/package.json
sed -i '' -E "s/\"version\": \"[^\"]*\"/\"version\": \"$1\"/g" packages/ricons-utils/package.json

git add .
git commit -m "@xicons/utils@${1}, @vicons/utils@${1}, @v2icons/utils@${1}, @ricons/utils@${1}"
git tag "@xicons/utils@${1}"
git tag "@vicons/utils@${1}"
git tag "@v2icons/utils@${1}"
git tag "@ricons/utils@${1}"