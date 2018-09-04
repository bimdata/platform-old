const fs = require('fs');
const sourcePath = 'node_modules/@mdi/svg/svg';
const destPath = 'src/assets/images/icons';

const svgIcons = [
  'chevron-down.svg',
  'chevron-left.svg',
  'chevron-right.svg',
  'chevron-up.svg',
  'plus.svg',
  'alert-circle.svg',
  'close-circle.svg',
  'check-circle.svg',
  'play.svg',
  'cloud-upload.svg',
];

fs.readdir(sourcePath, function(err, items) {

  for (let item of items) {
    if (svgIcons.indexOf(item) != -1) {
      try {
        copyFile(sourcePath + '/' + item, destPath + '/' + item)
          .then(() => { console.log(item + ' copied') })
      } catch (err) {
        console.log(err)
      }
    }
  }
});

async function copyFile(source, target) {
  var rd = fs.createReadStream(source);
  var wr = fs.createWriteStream(target);
  try {
    return await new Promise(function(resolve, reject) {
      rd.on('error', reject);
      wr.on('error', reject);
      wr.on('finish', resolve);
      rd.pipe(wr);
    });
  } catch (error) {
    rd.destroy();
    wr.end();
    throw error;
  }
}
