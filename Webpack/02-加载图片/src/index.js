import _ from 'lodash';
import './style.css';
import Icon from './icon.png';

function component() {
  var element = document.createElement('div');

  // Lodash，现在由此脚本导入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  //TODO:
  //将图片添加到我们现有的div
  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);
  
  return element;
}

document.body.appendChild(component());