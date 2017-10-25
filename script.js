function loadTweets(query){
	$.ajax({
		dataType: "json",
		url: 'getTweets.php',
		data: {'query': query},
		type: 'GET',
		contentType: "application/json; charset=utf-8",
		success: function(data){
			var i=0;
			var positive = 0;
			var negative = 0;
			var neutral = 0;
			
			for(i=0 ; i<data.length ; i++){
				var user_name = data[i]['user_name'];
				var text = data[i]['text'];
				var retweet_count = data[i]['retweet_count'];
				var sentiment = data[i]['sentiment'];
				
				
				
				var panelType = '';
				
				if(sentiment < 0){
					panelType = 'panel-danger';
					negative++;
				}
				else if(sentiment == 0){
					panelType = 'panel-default';
					neutral++;
				}
				else if(sentiment > 0){
					panelType = 'panel-success';
					positive++;
				}
				
				var tempPanel = '<div class="panel '+panelType+'">'+
									'<div class="panel-heading">'+user_name+'</div>'+
									'<div class="panel-body">'+text+'</div>'+
									'<div class="panel-footer">Retweets: '+retweet_count+'&nbsp&nbsp&nbspSentiment Polarity: '+sentiment+'</div>'+
								'</div>';
				$("#tweet").append(tempPanel);
			}
			
			$("#total-tweets").html("Total Tweets Fetched "+data.length);
			$("#neutral-tweets").html("Neutral&nbsp&nbsp"+parseInt((neutral*100/data.length))+" %");
			$("#positive-tweets").html("Positive&nbsp&nbsp"+parseInt((positive*100/data.length))+" %");
			$("#negative-tweets").html("Negative&nbsp&nbsp"+parseInt((negative*100/data.length))+" %");
			
		},
		error: function(xhr, status, thrown){
			alert("error");
		}
	});
	return false;
}

$(document).ready(function(){
	$("#search").click(function(){
		$("#tweet").empty();
		$("#negative-tweets").empty();
		$("#total-tweets").empty();
		$("#positive-tweets").empty();
		$("#neutral-tweets").empty();
		var query = $("#query").val();
		loadTweets(query);
		return false;
	});
});

/*Sample Tweet Panel

<div class="panel">
	<div class="panel-heading"></div>
	<div class="panel-body"></div>
	<div class="panel-footer"></div>
</div>

*/