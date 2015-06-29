import {MenuInfo} from '../models/MainModel';
import {ZC_CONST} from '../../../core/consts/ZCConst';

class MainController {
    constructor($window, $state, $translatePartialLoader, languageId, securityUser, loginInfoVO, SecurityUserResource) {
        'ngInject';
        $translatePartialLoader.addPart('security/main');
        this.languageId = languageId;
        this.securityUser = securityUser;
        this.loginInfoVO = loginInfoVO;
        console.debug(this.loginInfoVO);
        this.SecurityUserResource = SecurityUserResource;
        this.$window = $window;
        this.$state = $state;
        this.$window.sessionStorage.setItem('securityRoleVO', angular.toJson(this.loginInfoVO.securityRoleVO));

        this.init();

        console.debug(this.loginInfoVO.securityRoleVO);
    }

    init(){
        this.tabTotle = ZC_CONST.MAX_MENU;
        this.menuTabs = [];
        this.activeHeader = 'Home';
        this.show = {
            'showHeader' : true,
            'changeShowHeader': false,
            'showFooter': true
        };
    }

    isMultipleRoles() {
        if(this.loginInfoVO.securityRoleVOList){
            if(this.loginInfoVO.securityRoleVOList.length > 1){
                return true;
            }
        }
        return false;
    }

    isSameCenter() {
        let centerId = '';
        if(this.loginInfoVO.securityRoleVOList){
            angular.forEach(this.loginInfoVO.securityRoleVOList, function(securityRole, index){
                if(index > 0){
                    if(!angular.equals(securityRole.centerId, centerId)){
                        return false;
                    }
                }
                centerId = securityRole.centerId;
            });
        }
        return true;
    }

    getCenterName(centerName) {
        if(centerName){
            return centerName;
        }
        return '*';
    }

    getUserInfo() {
        var userName = this.securityUser.userName;
        if(this.loginInfoVO.securityRoleVO){
            userName = userName + ' ' + this.loginInfoVO.securityRoleVO.roleName;
        }
        return userName;
    }

    changeRole (securityRoleVO) {

        this.SecurityUserResource.getRolesInfo(securityRoleVO.roleId, this.languageId).then(function (response) {
                this.init();
                let result = response.result;
                this.loginInfoVO.programVOListOne = result.programVOListOne;
                this.loginInfoVO.programVOListTwo = result.programVOListTwo;
                this.loginInfoVO.programVOListThree = result.programVOListThree;
                this.$window.sessionStorage.setItem('SecurityRoleVO', angular.toJson(securityRoleVO));
            }.bind(this)
        );
    }

    getRoleName(securityRoleVO) {
        if(this.isSameCenter()){
            return securityRoleVO.roleName;
        }
        return  securityRoleVO.roleName;
    }

    getPrograms(programId) {

        let menusAll = [];
        let i = 0;
        let programVOListTwo = angular.copy(this.loginInfoVO.programVOListTwo);
        let programVOListThree = angular.copy(this.loginInfoVO.programVOListThree);
        angular.forEach(programVOListTwo, function(programTwo){
            if(angular.equals(programTwo.parentProgramId, programId)){
                if(i > 0){
                    let menuInfo = new MenuInfo();
                    menuInfo.isDivider = 1;
                    menusAll.push(menuInfo);
                }
                angular.forEach(programVOListThree, function(programThree){
                    if(angular.equals(programThree.parentProgramId, programTwo.programId)){
                        let menuInfoTemp = new MenuInfo();
                        let uri = angular.copy(programThree.uri);
                        //let condition = '';
                        let parameters = {};
                        angular.forEach(programThree.programConfigVOList, function(programConfig){
                            //condition = condition + '&' +  programConfig.configCode + '=' + programConfig.configValue;
                            parameters[programConfig.configCode] =  programConfig.configValue;
                        });
                        //if(condition !== ''){
                        //    if(uri.indexOf('?') > 0){
                        //        uri = uri + condition;
                        //    } else {
                        //        uri = uri + condition.substr(1);
                        //    }
                        //}
                        menuInfoTemp.programId =  angular.copy(programThree.programId);
                        menuInfoTemp.url =  uri;
                        menuInfoTemp.tabName =  programThree.uriExtends;
                        menuInfoTemp.uriType =  programThree.uriType;
                        menuInfoTemp.parameters =  parameters;
                        menuInfoTemp.name =  angular.copy(programThree.programName);

                        menusAll.push(menuInfoTemp);
                    }
                });
                i = i + 1;
            }
        });
        return menusAll;
    }

    getProgramClass(isDivider) {
        if(isDivider === 1){
            return 'divider';
        }
        return '';
    }

    getMenuActive(isActive) {
        if(isActive === 1){
            return 'active';
        }
        return '';
    }

    getMenuActiveShow(isActive) {
        if(isActive === 1){
            return true;
        }
        return false;
    }

    getActiveHeader(name){
        if(this.activeHeader === name){
            return 'active';
        }
        return '';
    }

    setActiveHeader(name){
        this.activeHeader = name;
    }

    showNewProgram(program){
        this.addMenuTab(program);
        let parameters = program.parameters;
        this.$state.go(program.url, parameters);
    }

    clickProgram(program, activeName){
        this.show.changeShowHeader = true;
        this.showHeader(false);
        this.setActiveHeader(activeName);
        this.showNewProgram(program);
    }

    notShowHeader() {
        if(this.show.changeShowHeader){
            this.showHeader(false);
        }
    }

    goHome() {
        this.show.changeShowHeader = false;
        this.showHeader(true);
        this.setActiveHeader('Home');
        this.$state.go('main.welcome');
    }
    
    goLogin() {
        this.$window.sessionStorage.removeItem('securityUser');
        this.$state.go('login');
    }

    showHeader(isTrue){
        this.show.showHeader = isTrue;
        this.show.showFooter = isTrue;
    }
    
    addMenuTab(menuTab){
        let isAdd = true;
        for (let i = 0; i < this.menuTabs.length; i++) {
            this.menuTabs[i].isActive = 0;
            if (this.menuTabs[i].programId === menuTab.programId) {
                isAdd = false;
                this.menuTabs[i].isActive = 1;
            }
    
        }
    
        if(isAdd){
            menuTab.isActive = 1;
            this.menuTabs.push(menuTab);
        }
    
        if(this.menuTabs.length > this.tabTotle){
            this.menuTabs.splice(0);
        }
        console.debug(this.menuTabs);
    }

}

export default MainController;
