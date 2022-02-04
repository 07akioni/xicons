ICON_SETS=('antd' 'carbon' 'fa' 'fluent' 'ionicons4' 'ionicons5' 'material' 'tabler')

rm -rf ./tests/xicons

for icon_set in "${ICON_SETS[@]}"
do
  echo $icon_set
  mkdir -p "./tests/xicons/${icon_set}"
  cp -r "../xicons/dist/${icon_set}/vue2" "./tests/xicons/${icon_set}"
done
