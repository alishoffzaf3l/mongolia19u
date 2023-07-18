import {computed, defineComponent, reactive, ref} from "vue";
import {mapActions, useStore} from "vuex";
import {MetaConst} from "@/utils/MetaUtils";

export default defineComponent({
    props: {
        url: String,
        dict: String,
        options: Array,
        labelField: {default: MetaConst.DefaultLabelField},
        valueField: {default: MetaConst.DefaultValueField},
    },
    data() {
        return {
            dataSource: null
        }
    },
    created() {
        if(!this.options) {
            if(this.dict) {
                this.dataSource = ref(useStore().getters['sys/getOptionsByDictType'](this.dict, this.labelField, this.valueField));
            } else if(this.url) {
                this.dataSource = ref(useStore().getters['sys/getOptionsByUrl'](this.url, this.labelField, this.valueField));
            }
        } else {
            this.dataSource = this.options;
        }
    },
    methods: { }
})
