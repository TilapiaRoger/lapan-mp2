let adminMenu, userMenu;
            
$(document).ready(
    function(){
        let username = $("#username").attr("name")

        if(username == "webAdmin"){
            $("#home-user").hide();
            $(".home-container").hide();
            $("#org-box").hide();
            $("#org-table").show();
            $("#home-admin").show();
        }
        else{
            $("#org-table").hide();
            $("#org-box").show();
            $("#home-user").show();
            $("#home-admin").hide();
        }
    }
)