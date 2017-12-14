import sys, json
import tweepy
from textblob import TextBlob

consumer_key = ''
consummer_secret = ''

access_token = ''
access_token_secret = ''

auth = tweepy.OAuthHandler(consumer_key, consummer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

query= sys.argv[1]

public_tweets = api.search(query)

def tweetSentiment(tweet):
	analysis = TextBlob(tweet.text)
	return analysis.sentiment.polarity

tweet_json = '['		

for tweet in public_tweets:

	userName = tweet.user.name
	text = tweet.text
	retweetCount = tweet.retweet_count
	sentiment = tweetSentiment(tweet)
	tweet_json += json.dumps({'user_name': userName, 'text': text, 'retweet_count': retweetCount, 'sentiment': sentiment}) + ', '
	
tweet_json = tweet_json[:-2]
tweet_json += ']'
print(tweet_json)
