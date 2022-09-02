import qs from "qs";
import {h} from "vue";
import {GET, POST} from "@/utils/request";
import {cloneDeep} from "lodash-es";
import {DoubleLeftOutlined} from '@ant-design/icons-vue'

const TypeMethodMaps = {
    Add: null, Edit: GET, Del: POST, View: GET,
    Import: POST, Export: POST, Detail: GET, Submit: POST
}

const FunMetaMaps = {
    Add: 'Add', Del: 'Del', Edit: 'Edit', View: 'View',
    Import: 'Import', Export: 'Export', Detail: 'Detail',
    Cancel: 'Cancel', Submit: 'Submit', Reset: 'Reset',
    Expanded: 'Expanded', // 展开/折叠
    getFunMeta: (field, funMetas) => {
        if(funMetas instanceof Array) {
            return funMetas.find(item => item.field == field)
        }
    }
}
const FunBtnConfig = {
    Add: {type: 'default', class: 'ivz-fm-add'},
    Del: {type: 'danger', class: 'ivz-fm-del', style: {color: 'red'}},
    Edit: {type: 'link', class: 'ivz-fm-edit'},
    View: {type: 'primary', class: 'ivz-fm-view'},
    Reset: {type: 'dashed', class: 'ivz-fm-reset'},
    Import: {type: 'default', class: 'ivz-fm-import'},
    Export: {type: 'default', class: 'ivz-fm-export'},
    Detail: {type: 'default', class: 'ivz-fm-detail'},
    Cancel: {type: 'link', class: 'ivz-fm-cancel'},
    Submit: {type: 'primary', class: 'ivz-fm-submit'},
    Expanded: {type: 'default', class: 'ivz-fm-expanded'},
    __Default: {type: 'default', class: 'ivz-fm-default'},
}

const getMetaConfig = function (field, props) {
    let config = FunBtnConfig[field];
    if(config == null) {
        config = FunBtnConfig["__Default"];
    }

    let cloneConfig = cloneDeep(config);
    if(props) {
        return Object.assign(cloneConfig, props)
    }
    if(FunMetaMaps.Expanded == field) {
        // 旋转角度
        cloneConfig['rotate'] = 90;
        // 给展开增加操作图标
        cloneConfig.icon = () => h(DoubleLeftOutlined, {rotate: cloneConfig.rotate})
    }
    return cloneConfig;
}

export {TypeMethodMaps, FunMetaMaps, getMetaConfig}

export default {
    /**
     * 是否是生产环境
     * @return {boolean}
     */
    isProd() {
        return import.meta.env.PROD
    },

    resolverQueryOfUrl(url) {
        let queryStr = url.split('?')[1];
        return qs.parse(queryStr);
    }
}
