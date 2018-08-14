(function(){
    angular.module('primeiroApp').component('field', {
        bindings: {
            grid: '@',
            id: '@',
            label: '@',
            placeholder: '@',
            type: '@',
            model: '=',
            readOnly: '<'
        },
        controller: ['gridSystem', function(gridSystem){
            this.$onInit = function(){
                this.gridClasses = gridSystem.toCssClasses(this.grid);
            }
        }],
        template: `
        <div class="{{ $ctrl.gridClasses }}">
            <div class="form-group">
                <label for="{{ $ctrl.id }}">{{ $ctrl.label }}</label>
                <input ng-readonly="$ctrl.readOnly" id="{{ $ctrl.id }}" type="{{ $ctrl.type }}" class="form-control" placeholder="{{ $ctrl.placeholder }}" ng-model="$ctrl.model">
            </div>
        </div>
        `
    });
})()