//in your app, use a config block to decorate ui.router's $transitions.create function
//which enables us to reconfigure the tree changes of a transition before passing it back to ui.router

//your app...
angular.module("yourApp", ["ui.router", "sticky-states-util"])

//the config 
.config(["$provide", function($provide) {
    //decorate $transitions "create" function
    $provide.decorator("$transitions", ["$delegate", "StickyStatesUtil", function createDecorator($delegate, StickyStatesUtil) {
        var origCreate = $delegate.create; //save original create function
        $delegate.create = function(fromPath, targetState) { //override create function
            var transition = origCreate.apply($delegate, arguments); //get original transition
            
            //reconfigure tree changes
            transition._treeChanges = StickyStatesUtil.calculateStickyTreeChanges(transition, $delegate, origCreate);
            return transition; //return reconfigured transition
        };
        return $delegate; //return decorated service
    }]);
}]);
