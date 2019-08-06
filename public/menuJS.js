let adminMenu, userMenu;
            
$(document).ready(
    function(){
        let username = $("#username").attr("value")

        if(username == "webAdmin"){
            $("#profile-access").hide();
            $("#home-user").hide();
            $("#org-box").hide();
            $("#org-table").show()
            $("#home-admin").show();
            $(".user-icon").show();
        }
        else{
            $("#org-table").hide();
            $("#org-box").show();
            $("#home-user").show();
            $("#home-admin").hide();
            $(".user-icon").show();
        }
    }
)