'use strict';

angular.module('clientApp')
    .controller('EventDetailsCtrl', function ($routeParams, $scope, $location, FactoryEvent, FactoryEvents, FactorySlot, FactoryNotifications, FactoryAnswer, $cookies, $cookieStore, dataService) {

        var eventID = $routeParams.eventID;
        var userEnCours = $cookieStore.get('id');
        var isClose = "";
        var isCreator = false;
        var isParticipant = "";
        var eventEnCours = {};
        var slotEnCours = {};
        $scope.eventEdit = 0;

        FactoryEvent.getEvent({ id: eventID }, function (dataevent) {
            $scope.event = dataevent;
            eventEnCours = dataevent;

            if (dataevent.closedSlotID == 1) {
                isClose = true;
                $scope.isClose = true;
                $scope.isVisible = true;
                $scope.eventStatut = "Cet événement est clôturé, il n'est donc plus modifiable."
            } else {
                isClose = false;
                $scope.isVisible = false;

                var IDcreator = dataevent.creatorID;
                if (IDcreator === userEnCours) {
                    $scope.isVisible = false;
                    isCreator = true;
                } else {
                    var read = { eventID: eventEnCours, userID: userEnCours};

                    FactoryNotifications.markAsRead(read, function(data){
                        console.log(data);
                    }, function (response) {
                        console.log(response);
                        $scope.errorMessage = response.data.description;
                    });

                    $scope.isVisible = true;
                }
            }
            FactorySlot.getFull({ EventID: eventID, UserID: userEnCours }, function (dataslots) {
                $scope.slots = dataslots;
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
        }, function (response) {
            $scope.errorMessage = response.data.description;
        });


        $scope.delete = function () {
            FactoryEvent.deleteEvent({ id: eventID }, function (response) {
                angular.element('#myModalDelete').modal('hide');
                angular.element('body').removeClass('modal-open');
                angular.element('.modal-backdrop').remove();
                dataService.setData("deleteSuccess");
                $location.path('accueil');
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
        }

        $scope.Participate = function (slotID) {
            var slotAnswer = { userID: userEnCours, EventSlotID: slotID, isAvailable: 1 };
            FactoryAnswer.update(slotAnswer, function (response) {
                FactorySlot.getFull({ EventID: eventID, UserID: userEnCours }, function (dataslots) {
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

                FactorySlot.getFull({ EventID: eventID, UserID: userEnCours }, function (dataslots) {
                    $scope.slots = dataslots;
                }, function (response) {
                    $scope.errorMessage = response.data.description;
                });
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });

        }


        $scope.clickCloture = function () {
            FactorySlot.getRecommandedSlots({ EventID: eventID }, function (dataslots) {
                $scope.slotCloture = dataslots;
                angular.element('#myModalCloture').modal('show');
            }, function (response) {
                $scope.errorMessage = response.data.description;
            });
        }

       $scope.clickUsers = function (slotChoisi) {
            FactorySlot.getNegatives({id: slotChoisi}, function (datanegative) {
                $scope.NotParticipants = datanegative;
                
                FactorySlot.getPositives({id: slotChoisi}, function (datapositive) {
                    $scope.Participants = datapositive;
                    angular.element('#myModalUserList').modal('show');
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




