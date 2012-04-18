#!/bin/bash

if grep "mydomain.dev" /etc/hosts
	then
	echo "mydomain.dev exists in /etc/hosts"
else
	echo "127.0.0.1 mydomain.dev" >> /etc/hosts
fi

if grep "remotedomain.dev" /etc/hosts
	then
	echo "remotedomain.dev exists in /etc/hosts"
else
	echo "127.0.0.1 remotedomain.dev" >> /etc/hosts
fi