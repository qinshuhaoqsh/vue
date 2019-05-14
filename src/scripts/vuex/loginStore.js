import axios from "axios";

function setCookie(cname, cvalue, exdays){
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            console.info(cname + "=" + cvalue + "; " + expires);
            document.cookie = cname + "=" + cvalue + "; " + expires;
            console.info(document.cookie);
        };
function hrefs (url){
    window.location.href=url;
    }
export let login = {
    namespaced: true,
    state: {
        flag:true
    },
    mutations: {
        setCode(state, username) {
            state.flag =false;
            setCookie("username",username,7);
        },
        out(state){
            state.flag=true;
        }
    },
    actions: {
        loginyanzheng(store, { username, password, cb }) {
            axios.get("http://59.110.173.55:5000/vue/login", {
                params: { username, password }
            }).then((res) => {
                if (res.data.code == 0) {
                    cb("用户名或密码错误", "warning", res.data.code)
                } else {
                    cb(res.data.type, "success", res.data.code)
                }
                store.commit("setCode", username)
            })
        },
        out(store,data){
            store.commit("out");
        }
    }

}