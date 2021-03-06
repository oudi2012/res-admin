import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/admin',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/admin/userInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
