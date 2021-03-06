

var host = "http://52.34.9.15/api/v1/patients/";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


var dhat = angular.module('dhat', []);

dhat.controller('customersCtrl', function($scope, $http) {
    var pendingTask;

    
function fetch(){
        
        $http({
    url: (host +$scope.id), 
    method: "GET",
    params: {USER:localStorage.username,PW:localStorage.password}
 }).then(function(response) {
        
    for(a in response.data.forms){
            form = response.data.forms[a];
            _form = {}
        for(key in form.formData){
            if(key[0]!="_"){
            _form[key.replace(/_/g," ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})] = form.formData[key]}
        }
        form.formData = _form
        }
        
        $scope.forms = response.data.forms;
                             $scope.patientData = response.data.patientInfo;



var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        //this.response is what you're looking for
        console.log(this.response, typeof this.response);
        var img = document.getElementById('photo');
        var url = window.URL || window.webkitURL;
        img.src = url.createObjectURL(this.response);
    }
}
xhr.open('GET', "http://ec2-52-34-9-15.us-west-2.compute.amazonaws.com/tomcat/ODKAggregate/view/binaryData?blobKey=pre%3Doperative-form[%40version%3Dnull+and+%40uiVersion%3Dnull]%2F_1_Pre-operative_Form[%40key%3D"+ $scope.patientData.URI+"]%2Fpatient_info%3Apatient_photo");
xhr.responseType = 'blob';
xhr.setRequestHeader("Authorization", btoa("GT_Admin" + ":" + "GT_cataract"));
xhr.send(); 
/*
$.ajax
({
  type: "GET",
  url:"http://ec2-52-34-9-15.us-west-2.compute.amazonaws.com/tomcat/ODKAggregate/view/binaryData?blobKey=pre%3Doperative-form[%40version%3Dnull+and+%40uiVersion%3Dnull]%2F_1_Pre-operative_Form[%40key%3D"+ $scope.patientData.URI+"]%2Fpatient_info%3Apatient_photo",
 async: false,
  headers: {
    "Authorization": "Basic " + btoa("GT_Admin" + ":" + "GT_cataract")
  },
  success: function (data){
data = atob(data);
console.log(data);


var arrayBufferView = new Uint8Array( data );
    var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );
    var img = document.querySelector( "#photo" );
    img.src = imageUrl;

    alert('Done'); 
  }


});
*/
                              
                             });
    }
    
    
$scope.getPatient = function(patient){
alert(patient);
console.log(patient);
$scope.id = patient.ID;
$scope.change()
};
    
    $scope.change = function() {
      if (pendingTask) {
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };
    
if ($scope.id === undefined) {
      $scope.id = "Enter Patient ID";
      fetch();
    }
    
$scope.update = function(patient) {
      $scope.id = patient.id;
      $scope.change();
    };
    $scope.select = function() {
      this.setSelectionRange(0, this.value.length);
    }
    

});




dhat.controller('searchCtrl', function($scope, $http) {
    var pendingTask;
function fetch(){
        options = {}
        options.USER = localStorage.username
        options.PW = localStorage.password
       if(typeof($scope.birthyear)!="undefined") options.birthyear = $scope.birthyear;
       if(typeof($scope.name)!="undefined") options.name = $scope.name;
        if(typeof($scope.phone)!="undefined") options.phone = $scope.phone;
        $http({
    url: (host), 
    method: "GET",
    params: options
 }).then(function(response) {
                
        $scope.patients = response.data.patients;            
                            });
    }
    
    
    
$scope.change = function() {
      if (pendingTask) {
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };
    
$scope.update = function() {
      $scope.change();
};

    

});

