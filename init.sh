[ ! -d resources ] && mkdir resources
[ ! -d resources/fluent ] && git clone https://github.com/microsoft/fluentui-system-icons.git resources/fluent
[ ! -d resources/ionicons5 ] && git clone https://github.com/ionic-team/ionicons.git resources/ionicons5
[ ! -d resources/ionicons4 ] && git clone https://github.com/ionic-team/ionicons.git resources/ionicons4
[ ! -d resources/antd ] && git clone https://github.com/ant-design/ant-design-icons.git resources/antd
[ ! -d resources/material ] && git clone https://github.com/google/material-design-icons.git resources/material
[ ! -d resources/fa ] && git clone https://github.com/FortAwesome/Font-Awesome.git resources/fa
[ ! -d resources/tabler ] && git clone https://github.com/tabler/tabler-icons.git resources/tabler

echo "init done"
