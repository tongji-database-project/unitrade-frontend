const getImageUrl = (path: string) => {
  // 开头有根目录 / 则去掉这个 /
  // TODO: 做合法性检查
  if (path[0] && path[0] === '/') path = path.slice(1)
  return `http://47.97.215.255/img/${path}`
}

export {
  getImageUrl,
}
