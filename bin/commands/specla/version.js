const version = {
  name: 'version',
  description: 'Get current version of the specla framework',

  handle(){
    console.log(packageInfo.version);
  }
};

module.exports = version;