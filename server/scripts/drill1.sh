#! /bin/bash

  let nivelAnterior=0

  for((i=0; i<=100; i++))
  do
     sleep 0.9
     let nivel=$RANDOM%30
     let nivel=$nivel+$nivelAnterior
     let nivelAnterior=$nivel
     mosquitto_pub -h localhost -p 1883 -t "nivel/S0012" -m "$nivel"
     mosquitto_pub -h localhost -p 1883 -t "nivel/S0015" -m "$nivel"
     mosquitto_pub -h localhost -p 1883 -t "nivel/S0016" -m "$nivel"
     mosquitto_pub -h localhost -p 1883 -t "nivel/S0001" -m "$nivel"
     mosquitto_pub -h localhost -p 1883 -t "nivel/S0003" -m "$nivel"
     mosquitto_pub -h localhost -p 1883 -t "nivel/S0005" -m "$nivel"
     mosquitto_pub -h localhost -p 1883 -t "nivel/S0007" -m "$nivel"
     mosquitto_pub -h localhost -p 1883 -t "nivel/S0014" -m "$nivel"
  done
