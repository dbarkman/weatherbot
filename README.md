# weatherbot
A Discord bot that will give the temp based on a given airport code.

Examples:
* !temp:phx
* !temp:kffz
* !temp:egll

If the airport is in the United States, the temp is given in Farenhiet, otherwise, it's in Celcius.
If the airport is in the US, you can use a three digit airport code, since all US airports start with "K", otherwise, you must use a four digit code.

Todo:
* add more weather functionality, current conditions, etc
* add the current weather icon png
* add ability to let a user set their airport for the server, e.g. !temp:@cybler and get the temp for KFFZ