let recommendRoutes = [
  {
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home/index.vue'),
    name: 'home',
    meta: {
      title: '发现音乐', icon: 'music'
    }
  }
]

let recommendMap = []
recommendRoutes.concat().forEach(route => {
  let map = {
    path: route.path,
    name: route.name,
    meta: route.meta
  }
  recommendMap.push(map)
})

export {
  recommendRoutes,
  recommendMap
}
