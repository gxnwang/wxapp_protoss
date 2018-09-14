import{Base} from '../../utils/base.js'
class Home extends Base{
  constructor(){
    super()
  }
  getBannerData(id,callback){

    var params = {
      url: "banner/"+id,
      sCallback: function(res){
        callback && callback(res.items)
      }
    }
    this.request(params)
  }

  getThemeData(callBack){
    var params = {
      url: "theme?ids=1,2,3",
      sCallback: function (data) {
        callBack && callBack(data)
      },
    }
    this.request(params)
  }
  getProductsData(callBack) {
    var params = {
      url: "product/recent",
      sCallback: function (data) {
        callBack && callBack(data)
      },
    }
    this.request(params)
  }
}

export {Home};