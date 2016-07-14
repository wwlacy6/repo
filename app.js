angular.module('assessment_app', ['ionic'])

.controller('contacts_ctrl', function ($scope, contact_service, $ionicModal, $ionicPopup) {

    $scope.contacts = contact_service.get_contacts();

    $ionicModal.fromTemplateUrl('add_contact.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.open_modal = function() {
        $scope.modal.show();
    };

    $scope.close_modal = function() {
        $scope.modal.hide();
    };

    $scope.user = {};

    $scope.add_contact = function (user) {

        if (user.name && user.street && user.city && user.state && user.zip && user.country) {

            $scope.contacts.push({
                id: $scope.contacts.length + 1,
                name: user.name,
                street: user.street,
                city: user.city,
                state: user.state,
                zip: user.zip,
                country: user.country
            })

            $scope.close_modal();
            StatusBar.hide();
            $scope.reset_form();

        } else {
            var alertPopup = $ionicPopup.alert({
                title: "Enter all the fields!"
            })
        }

    };

    $scope.reset_form = function() {
        $scope.user = {};
    };
})

.controller('contact_details_ctrl', function($scope, $stateParams, contact_service) {
    $scope.contact_id = $stateParams.contact_id;
    $scope.contact = contact_service.get_contact($scope.contact_id);
})

.service('contact_service', function() {
    return {
        contacts: [
          {
              id: "1",
              name: "Thurmond Blumpkin",
              street: "525 Knob View Drive",
              city: "Winston-Salem",
              state: "NC",
              zip: "27104",
              country: "USA"
          },
          {
              id: "2",
              name: "Crotchem McClaren",
              street: "1302 Pleasant Ridge Rd",
              city: "Greensboro",
              state: "NC",
              zip: "27409",
              country: "USA"
          }
        ],
        get_contacts: function() {
            return this.contacts;
        },
        get_contact: function(contact_id) {
            for (i = 0; i < this.contacts.length; i++) {
                if (this.contacts[i].id == contact_id) {
                    return this.contacts[i];
                }
            }
        },
        update_contacts: function (contacts) {
            this.contacts = contacts;
        }
    }
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('contacts', {
          url: "/contacts",
          templateUrl: "templates/contacts.html",
          controller: "contacts_ctrl"
      })
      .state('contact_details', {
          url: "/contacts/:contact_id",
          templateUrl: "templates/contact_details.html",
          controller: "contact_details_ctrl"
      });

    $urlRouterProvider.otherwise("/contacts");
})