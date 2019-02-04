const fs = require('fs');
const sourcePath = 'node_modules/@mdi/svg/svg';
const destPath = 'src/assets/images/icons';

const svgIcons = [
  'account.svg',
  'alert-circle.svg',
  'application.svg',
  'check-circle.svg',
  'check.svg',
  'chevron-down.svg',
  'chevron-left.svg',
  'chevron-right.svg',
  'chevron-up.svg',
  'close-circle.svg',
  'close.svg',
  'cloud-upload.svg',
  'cloud.svg',
  'delete.svg',
  'eye.svg',
  'folder-outline.svg',
  'image-plus.svg',
  'keyboard_arrow_down',
  'keyboard_arrow_up',
  'magnify.svg',
  'pencil.svg',
  'play.svg',
  'plus.svg'
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
