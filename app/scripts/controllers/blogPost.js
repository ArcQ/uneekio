'use strict';

/**
 * @ngdoc function
 * @name uneekioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uneekioApp
 */
app.controller('BlogPostCtrl', function ($scope,$timeout,$location,$http,appConfig) {
    //initiate post
    var blogTitle = $location.search().title;
    //NEED if id doesn't exist, need to redirect to 404
    $scope.basePath = appConfig.data.default_path;
    $scope.apiPath = appConfig.data.default_api;

    $http.get($scope.apiPath + 'uneekio/blogPost/'+blogTitle)
    .success(function(data,status,headers,config){
        console.log("Initial Data:");
        console.log(data);
        $scope.post = {};
        $scope.post.image = 'images/blogPosts/'+data.blogId+'/post_img.jpg';
        $scope.post.title = data.title.replace(/_/g,' ');
        $scope.post.author = data.author;
        $scope.post.description = data.description;
        $scope.post.url = $scope.basePath + 'blogPost?='+data._id;
        $scope.post.blogId = data.blogId;
        $scope.post.contentUrl = 'blogPosts/'+data.blogId+'/content.html';        
        $scope.post.comments = formatComments(data.comments);
        $scope.post._id = data._id;
    })
    .error(function(data,status,headers,config){
      console.log(data);
    });

    function formatComments(comments){
        var finalComments = comments;
        for(var i in finalComments){
            finalComments[i].isReplyShown = false;
            finalComments[i].newReply = {
                    "author": "",
                    "content": ""
                  };
        }
        return finalComments;
    }

    $scope.newComment = {
                    "author": "",
                    "content": ""
                  };

    function checkInput(field,fieldName){
        if(field === undefined){
            alert("You must input something for your " + fieldName + "!")
        }
        else if(field.length<3){
            alert("Your " + fieldName + " must be more than 3 characters long!")
        }
        else{
            return true;
        }
    }

    $scope.saveNewComment = function(){
        console.log($scope.newComment);
        var isInputValid = checkInput($scope.newComment.author,'name');
        // check it again for comment.content
        if(isInputValid){
            isInputValid = checkInput($scope.newComment.content,'content');
        }
        
        if(isInputValid){
            $scope.loadStatus.start();

            $http.post($scope.apiPath + 'uneekio/' + $scope.post._id + '/comment/', $scope.newComment)
              .success(function(data,status,headers,config){
                setTimeout(function () {
                    $scope.$apply(function() {
                      $scope.loadStatus.success("Your comment was posted!");
                      $scope.post.comments = formatComments(data.result.comments);
                    })
                }, 1000);
                setTimeout(function () {
                    $scope.$apply(function() {
                      $scope.loadStatus.isShow = false;
                    })
                }, 4000);
              })
              .error(function(data,status,headers,config){
                alert("Our service is currently down, we're looking into it and will get it back up soon!");
              }
            );

        }
    }

    $scope.saveReply = function(comment){
        var isInputValid = checkInput(comment.newReply.author,'name');
        // check it again for comment.content
        if(isInputValid){
            isInputValid = checkInput(comment.newReply.content,'content');
        }
        console.log('comment.newReply:')
        console.log(comment.newReply);
        if(isInputValid){
            $scope.loadStatus.start();

            $http.post($scope.apiPath + 'uneekio/' + $scope.post._id + '/comment/' + comment.commentId + '/reply/', comment.newReply)
              .success(function(data,status,headers,config){
                setTimeout(function () {
                    $scope.$apply(function() {

                        $scope.loadStatus.success("Your reply was posted!");
                        $scope.post.comments = formatComments(data.result.comments);

                    })
                }, 1000);
                setTimeout(function () {
                    $scope.$apply(function() {
                      $scope.loadStatus.isShow = false;
                    })
                }, 4000);
              })
              .error(function(data,status,headers,config){
                alert("Our service is currently down, we're looking into it and will get it back up soon!");
              }
            );

        }
    }

    $scope.toggleCommentForm = function(comment){
        comment.isReplyShown = !comment.isReplyShown;
    }



    
  }).directive('collection', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            collection: '=', onSubmit: '&', onReply: '&'
        },
        template: "<div><comment class = 'comment' ng-repeat='comment in collection' comment='comment' on-submit = 'onSubmit({comment:sub_comment})' on-reply = 'onReply({comment:sub_comment})' ></comment></div>"
    }
    x
}).directive('comment', function ($compile) {
    return {
        restrict: "E",
        replace: true,
        scope: {
            comment: '=', onSubmit: '&', onReply: '&'
        },
        template: '<div><p style = "float:right">{{ comment.created | date : "dd  MMMM yyyy"}}</p><p>{{comment.author}}</p><p>{{comment.content}}</p><a class = "replyButton" ng-click = "onReply({sub_comment:comment})">Reply</a><form ng-show = "comment.isReplyShown" ng-submit="onSubmit({sub_comment:comment})"><h3>Reply to {{comment.author}}</h3><input class = "nameInput" type = "text" placeholder="Name" ng-model = "comment.newReply.author"><textarea id = "commentContent" rows="4" type = "textarea" placeholder="Your Thoughts" ng-model = "comment.newReply.content"></textarea><input class = "btn" type="submit" id="submit" value="Post Reply"></form></div>',
        link: function (scope, element, attrs) {
            if (scope.comment.replies.length>0) {
                var replies = angular.element("<collection collection='comment.replies' on-submit = 'onSubmit({sub_comment:comment})' on-reply = 'onReply({sub_comment:comment})'></collection>");
                element.append(replies); 
                $compile(replies)(scope);
            }
        }
    }
});
