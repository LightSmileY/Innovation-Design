import axios from 'axios'

const baseUrl = 'https://fengblog.xyz:3005'

/* 用户 */
export const getUserList = () => {
    return axios({
        url: baseUrl + '/user/getAll',
        method: 'get'
    })
}

export const updateUser = data => {
    return axios({
        url: baseUrl + '/user/update',
        method: 'put',
        data
    })
}

export const deleteUser = params => {
    return axios({
        url: baseUrl + '/user/delete',
        method: 'delete',
        params
    })
}

/* 文章 */
export const addArticle = data => {
    return axios({
        url: baseUrl + '/article/add',
        method: 'post',
        data
    })
}

export const getArticleList = () => {
    return axios({
        url: baseUrl + '/article/getAll',
        method: 'get'
    })
}

export const updateArticle = data => {
    return axios({
        url: baseUrl + '/article/update',
        method: 'put',
        data
    })
}

export const deleteArticle = params => {
    return axios({
        url: baseUrl + '/article/delete',
        method: 'delete',
        params
    })
}

/* 药品 */
export const addCommodity = data => {
    return axios({
        url: baseUrl + '/medic/add',
        method: 'post',
        data
    })
}

export const getCommodityList = () => {
    return axios({
        url: baseUrl + '/medic/getAll',
        method: 'get'
    })
}

export const updateCommodity = data => {
    return axios({
        url: baseUrl + '/medic/update',
        method: 'put',
        data
    })
}

export const deleteCommodity = params => {
    return axios({
        url: baseUrl + '/medic/delete',
        method: 'delete',
        params
    })
}


/* 疾病 */
export const addDisease = data => {
    return axios({
        url: baseUrl + '/disease/add',
        method: 'post',
        data
    })
}

export const getDiseaseList = () => {
    return axios({
        url: baseUrl + '/disease/getAll',
        method: 'get'
    })
}

export const updateDisease = data => {
    return axios({
        url: baseUrl + '/disease/update',
        method: 'put',
        data
    })
}

export const deleteDisease = params => {
    return axios({
        url: baseUrl + '/disease/delete',
        method: 'delete',
        params
    })
}

// 从koa2服务端获取七牛云token
export const getQiniuToken = () => {
    return axios({
        url: 'https://fengblog.xyz:3029/message/getQiniuToken',
        method: 'get'
    })
}