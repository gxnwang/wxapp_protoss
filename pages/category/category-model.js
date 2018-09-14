import {
  Base
} from '../../utils/base.js'

class Category extends Base {
  constructor() {
    super();
  }
  /** 获取所有分类 */
  getCategoryType(callback) {
    var params = {
      url: 'category/all',
      sCallback: function(data){
        callback && callback(data)
      }
    }
    this.request(params)
  }
  /** 根据分类ID获取商品信息 */
  getProductsByCategory(id,callback){
    var params = {
      url: 'product/by_category/'+id,
      sCallback: function(data){
        callback && callback(data)
      }
    }
    this.request(params)
  }
}
export {Category}