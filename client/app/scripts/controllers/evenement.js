'use strict';

angular.module('clientApp')
    .controller('EventDetailsCtrl', function ($routeParams, $scope, $location, FactoryEvent, FactoryEvents, FactorySlot, FactoryAnswer, $cookies, $cookieStore) {

        var eventID = $routeParams.eventID;
        var userEnCours = $cookieStore.get('id');
        var isCreator = false;
        var eventEnCours = {};
        var slotEnCours = {};
        $scope.eventEdit = 0;


console.log(eventID);
        FactoryEvent.getEvent({ id: eventID }, function (dataevent) {
            $scope.event = dataevent;
            eventEnCours = dataevent;

            var IDcreator = dataevent.creatorID;
            if (IDcreator === userEnCours) {
                $scope.isAdmin = false;
                isCreator = true;
            } else {
                $scope.isAdmin = true;
            }

            FactorySlot.getFull({EventID: eventID, UserID: userEnCours}, function (dataslots) {
                console.log("résultat getFull :" +dataslots );
                $scope.slots = dataslots;
            }, function (response) {
                console.log(response);
                $scope.errorMessage = response.data.description;
            });
            
            FactorySlot.getRecommandedSlots({EventID: eventID}, function (dataslots) {
                 console.log("résultat getRecommandedSlots :" +dataslots );
                $scope.slotCloture = dataslots;
            }, function (response) {
                console.log(response);
                $scope.errorMessage = response.data.description;
            });

        }, function (response) {
            console.log(response);
            $scope.errorMessage = response.data.description;
        });


        $scope.delete = function () {
            FactoryEvent.deleteEvent({id: eventID}, function (response) {
                angular.element('#myModalDelete').modal('hide');
                angular.element('body').removeClass('modal-open');
                angular.element('.modal-backdrop').remove();
                $location.path('accueil');
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
        }

        $scope.Participate = function (slotID) {
            var slotAnswer = { userID: userEnCours, EventSlotID: slotID, isAvailable: 1 };
            FactoryAnswer.update(slotAnswer, function (response) {
                FactorySlot.getFull({EventID: eventID, UserID: userEnCours}, function (dataslots) {
                $scope.slots = dataslots;
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
        }


        $scope.notParticipate = function (slotID) {
            var slotAnswer = { userID: userEnCours, EventSlotID: slotID, isAvailable: 0 };
            FactoryAnswer.update(slotAnswer, function (response) {
                 FactorySlot.getFull({EventID: eventID, UserID: userEnCours}, function (dataslots) {
                $scope.slots = dataslots;
                }, function (response) {
                    $scope.errorMessage = response.data.description;
                });
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });

        }


        $scope.closeEvent = function () {
            var slotChoisi = $scope.slotListe;
            FactoryEvents.close({ id: eventID, slotID: slotChoisi }, function (response) {
                angular.element('#myModalCloture').modal('hide');
                $scope.successMessage = "Clôture de l'événement effectuée.";
            }, function (response) {
                console.log(response);
                console.log(response.data.description);
                $scope.errorMessage = response.data.description;
            });
        }

        $scope.edit = function () {
            $scope.eventEdit = 1;
            $scope.title = eventEnCours.title;
            $scope.address = eventEnCours.address;
            $scope.description = eventEnCours.description;
        }

        $scope.updateSlot = function () {
            var eventSlot = { day: angular.element('#slotDate').val(), time: angular.element('#slotTime').val(), comment: $scope.slotComment };

            FactorySlot.update({ id: slotEnCours }, eventSlot, function (response) {
                angular.element('#myModalSlotEdit').modal('hide');
                $scope.successMessage = "Modification du créneau effectuée.";
                FactorySlot.getAll({ EventID: eventID }, function (dataslots) {
                    $scope.slots = dataslots;
                }, function (response) {
                    $scope.errorMessage = response.data.description;
                });
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
        }

        $scope.undoEdit = function () {
            $scope.eventEdit = 0;
        }


        $scope.editSlot = function (slotID) {
            slotEnCours = slotID;
            FactorySlot.get({ id: slotID }, function (data) {
                var date = new Date(data.day);
                var heure = new Date(data.time);
                $scope.timeSlot = data.time;
                $scope.slotDate = date;
                $scope.slotComment = data.comment;
                angular.element('#myModalSlotEdit').modal('show');
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
        }


        $scope.deleteSlot = function (slotID) {
            FactorySlot.delete({ id: slotID }, function (response) {
                $scope.successMessage = response.statut;
                FactorySlot.getAll({ EventID: eventID }, function (dataslots) {
                    $scope.slots = dataslots;
                }, function (response) {
                    $scope.errorMessage = response.data.description;
                });
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
        }


        $scope.createSlot = function () {
            var objToSave = new FactorySlot();
            objToSave.eventID = eventID;
            objToSave.time = angular.element('#eventTime').val();
            objToSave.day = angular.element('#eventDate').val();
            objToSave.comment = $scope.eventComment;
            objToSave.$create(function (response) {
                angular.element('#myModalSlot').modal('hide');
                $scope.successMessage = "Création du créneau effectuée.";
                FactorySlot.getAll({ EventID: eventID }, function (dataslots) {
                    $scope.slots = dataslots;
                }, function (response) {
                    $scope.errorMessage = response.data.description;
                });
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
        };

        $scope.saveEvent = function () {
            var event = { title: $scope.title, description: $scope.description, address: $scope.address };

            FactoryEvent.updateEvent({ id: eventID }, event, function (response) {
                $scope.eventEdit = 0;
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
        }


    });




