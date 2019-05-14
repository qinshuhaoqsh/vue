import axios from "axios";
export let register = {
    namespaced: true,
    actions: {
        dataqingqiu(store, { username, password, cb }) {
            axios.get("http://59.110.173.55:5000/vue/register", {
                params: { username, password }
            }).then((res) => {
                console.log(res);
                if (res.data.type == 0) {
                    //{"type":0,"code":200,"result":"该用户名已经被注册"}
                    cb(res.data.result, "warning", res.data.type)
                } else {
                    cb(res.data.result, "success", res.data.type)
                }
            })
        },
    }
}