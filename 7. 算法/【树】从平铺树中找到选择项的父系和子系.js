/**
 * @description 问题描述:
 * 一个平铺树做成的选择框，勾选了某项后记录了该项的id，需要找到勾选项的父系(父项、父项的父项……)和子系(子项、子项的子项……)。
 *
 * @example
 * 比如：下方代码中testTree是这个平铺树，selectedIds是勾选项，那么最终得找到：-1, 1, 1-1, 2, 2-1 (顺序不论)
 */

const testTree = {
  1: {
    id: '1',
    pId: '-1',
    name: '地理场景',
    loaded: true,
    hasChildren: true,
    nodes: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7'],
    detail: {
      id: '1',
      name: '地理场景',
      hasChildren: true,
      info: '',
    },
    detailLoaded: false,
  },
  2: {
    id: '2',
    pId: '-1',
    name: '地理实体',
    loaded: true,
    hasChildren: true,
    nodes: ['2-1', '2-2', '2-3', '2-4', '2-5', '2-6', '2-7'],
    detail: {
      id: '2',
      name: '地理实体',
      hasChildren: true,
      info: '',
    },
    detailLoaded: false,
  },
  3: {
    id: '3',
    pId: '-1',
    name: '地理单元',
    loaded: true,
    hasChildren: true,
    nodes: ['3-1', '3-2', '3-3', '3-4', '3-5', '3-6', '3-7'],
    detail: {
      id: '3',
      name: '地理单元',
      hasChildren: true,
      info: '',
    },
    detailLoaded: false,
  },
  4: {
    id: '4',
    pId: '-1',
    name: '物联感知',
    loaded: true,
    hasChildren: true,
    nodes: ['4-1', '4-2', '4-3', '4-4', '4-5', '4-6', '4-7'],
    detail: {
      id: '4',
      name: '物联感知',
      hasChildren: true,
      info: '',
    },
    detailLoaded: false,
  },
  '-1': {
    id: '-1',
    nodes: ['1', '2', '3', '4'],
    loaded: true,
  },
  '1-1': {
    id: '1-1',
    pId: '1',
    name: '点云',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '1-1',
      name: '点云',
      hasChildren: false,
      info: '',
      isScene: true,
      opacity: 0.5,
    },
    detailLoaded: false,
  },
  '1-2': {
    id: '1-2',
    pId: '1',
    name: '地形',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '1-2',
      name: '地形',
      hasChildren: false,
      info: '',
      isScene: true,
    },
    detailLoaded: false,
  },
  '1-3': {
    id: '1-3',
    pId: '1',
    name: '倾斜',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '1-3',
      name: '倾斜',
      hasChildren: false,
      info: '',
      isScene: true,
    },
    detailLoaded: false,
  },
  '1-4': {
    id: '1-4',
    pId: '1',
    name: '实景',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '1-4',
      name: '实景',
      hasChildren: false,
      info: '',
      isScene: true,
    },
    detailLoaded: false,
  },
  '1-5': {
    id: '1-5',
    pId: '1',
    name: 'DOM',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '1-5',
      name: 'DOM',
      hasChildren: false,
      info: '',
      isScene: true,
    },
    detailLoaded: false,
  },
  '1-6': {
    id: '1-6',
    pId: '1',
    name: 'TDOM',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '1-6',
      name: 'TDOM',
      hasChildren: false,
      info: '',
      isScene: true,
    },
    detailLoaded: false,
  },
  '1-7': {
    id: '1-7',
    pId: '1',
    name: '全要素',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '1-7',
      name: '全要素',
      hasChildren: false,
      info: '',
      isScene: true,
    },
    detailLoaded: false,
  },
  '2-1': {
    id: '2-1',
    pId: '2',
    name: '宗地',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '2-1',
      name: '宗地',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '2-2': {
    id: '2-2',
    pId: '2',
    name: '院落',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '2-2',
      name: '院落',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '2-3': {
    id: '2-3',
    pId: '2',
    name: '建筑',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '2-3',
      name: '建筑',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '2-4': {
    id: '2-4',
    pId: '2',
    name: '水系',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '2-4',
      name: '水系',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '2-5': {
    id: '2-5',
    pId: '2',
    name: '交通',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '2-5',
      name: '交通',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '2-6': {
    id: '2-6',
    pId: '2',
    name: '管线',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '2-6',
      name: '管线',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '2-7': {
    id: '2-7',
    pId: '2',
    name: '地质',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '2-7',
      name: '地质',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '3-1': {
    id: '3-1',
    pId: '3',
    name: '区划',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '3-1',
      name: '区划',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '3-2': {
    id: '3-2',
    pId: '3',
    name: '地貌',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '3-2',
      name: '地貌',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '3-3': {
    id: '3-3',
    pId: '3',
    name: '保护地',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '3-3',
      name: '保护地',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '3-4': {
    id: '3-4',
    pId: '3',
    name: '耕地',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '3-4',
      name: '耕地',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '3-5': {
    id: '3-5',
    pId: '3',
    name: '院落',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '3-5',
      name: '院落',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '3-6': {
    id: '3-6',
    pId: '3',
    name: '土质',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '3-6',
      name: '土质',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '3-7': {
    id: '3-7',
    pId: '3',
    name: '林业',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '3-7',
      name: '林业',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '4-1': {
    id: '4-1',
    pId: '4',
    name: '监控',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '4-1',
      name: '监控',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '4-2': {
    id: '4-2',
    pId: '4',
    name: '监测',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '4-2',
      name: '监测',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '4-3': {
    id: '4-3',
    pId: '4',
    name: '定位',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '4-3',
      name: '定位',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '4-4': {
    id: '4-4',
    pId: '4',
    name: '基站',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '4-4',
      name: '基站',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '4-5': {
    id: '4-5',
    pId: '4',
    name: '卡扣',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '4-5',
      name: '卡扣',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '4-6': {
    id: '4-6',
    pId: '4',
    name: '位置',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '4-6',
      name: '位置',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
  '4-7': {
    id: '4-7',
    pId: '4',
    name: '气象',
    loaded: true,
    hasChildren: false,
    detail: {
      id: '4-7',
      name: '气象',
      hasChildren: false,
      info: '',
    },
    detailLoaded: false,
  },
};

const selectedIds = ['1-1', '2-1'];

//1. 找到目标节点的父系； 2. 找到目标节点的子系
const treeFilter = (tree, ids) => {
  const finalTree = {};

  const copyChildren = (tree, children) => {
    children.forEach((chId) => {
      const child = tree[chId];
      finalTree[chId] = child;
      if (child.hasChildren || (child.nodes && child.nodes.length > 0))
        copyChildren(tree, child.nodes);
    });
  };
  const copyFather = (tree, pId) => {
    const father = tree[pId];
    finalTree[pId] = father;
    if (father.pId) copyFather(tree, father.pId);
  };

  ids.forEach((selectedId) => {
    const selectedItem = tree[selectedId];
    finalTree[selectedId] = selectedItem;
    //找父系
    if (selectedItem.pId) {
      copyFather(tree, selectedItem.pId);
    }
    // 找子系
    if (
      selectedItem.hasChildren ||
      (selectedItem.nodes && selectedItem.nodes.length > 0)
    ) {
      copyChildren(tree, selectedItem.nodes);
    }
  });

  // 移除每个节点的子项中不存在的项
  Object.keys(finalTree).forEach((nodeId) => {
    const node = finalTree[nodeId];
    if (node.hasChildren || (node.nodes && node.nodes.length)) {
      const chNodes = [];
      node.nodes.forEach((chNodeId, idx) => {
        if (finalTree[chNodeId]) {
          chNodes.push(chNodeId);
        }
      });
      if (chNodes.length == 0) {
        delete node.nodes;
        node.hasChildren = false;
      } else {
        node.nodes = chNodes;
      }
    }
  });

  return finalTree;
};

const test = treeFilter(testTree, selectedIds);
console.log('TODO: > file: byId.js > line 507 > test', test);
