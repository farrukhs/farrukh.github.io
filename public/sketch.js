var img;
let earthquake_list;
let earthquakes = [];
let idx = 0;

var clat = 0;
var clon = 0;


var lat = 51.5074; //33.6844;
var lon = -0.1278; //73.0479;

let frameRateVal;
let dat_tab;

let earthquakeReportChart;
let earthquakeReportChartData;

let socket;
let bgMusic;
let playBgMusicBtn;

function preload() {
  // preload() runs once
  img = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoiZmFycnVraCIsImEiOiJ1YjZJZ1NBIn0.gpvfQueo5w5JuaO9f93SuQ');
  //earthquake_list = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.csv');
  earthquake_list = [
    "2019-09-29T13:44:52.552Z,3.8817,64.2253,10,5.3,mb,,52,9.386,0.96,us,us70005nhk,2019-09-29T14:10:49.040Z,Carlsberg Ridge,earthquake,6.4,1.6,0.053,119,reviewed,us,us                                                            ",
"2019-09-29T11:19:59.719Z,11.9577,-73.6708,10,5,mb,,76,0.957,1.15,us,us70005ngk,2019-09-29T11:37:11.040Z,85km NNW of Dibulla, Colombia,earthquake,7.3,8.4,0.03,355,reviewed,us,us                                               ",
"2019-09-29T10:45:45.402Z,17.2239,-94.7987,123.24,4.5,mb,,125,2.716,1.1,us,us70005ngc,2019-09-29T13:49:40.986Z,29km ENE of Palomares, Mexico,earthquake,9.6,8.8,0.15,13,reviewed,us,us                                          ",
"2019-09-29T09:02:12.063Z,10.9969,91.6357,10,4.7,mb,,122,1.268,0.9,us,us70005nfl,2019-09-29T09:41:08.040Z,141km WSW of Bamboo Flat, India,earthquake,9.7,1.9,0.113,24,reviewed,us,us                                            ",
"2019-09-29T07:40:18.443Z,5.6455,126.5314,80.18,5.1,mb,,55,1.702,0.86,us,us70005nf1,2019-09-29T10:01:45.993Z,88km SSE of Pondaguitan, Philippines,earthquake,7.6,6.2,0.043,179,reviewed,us,us                                   ",
"2019-09-29T03:48:18.448Z,22.2441,144.4541,62.12,4.8,mb,,101,7.079,0.78,us,us70005ncu,2019-09-29T04:06:39.040Z,194km NNW of Farallon de Pajaros, Northern Mariana Islands,earthquake,10.9,7.6,0.053,111,reviewed,us,us          ",
"2019-09-29T02:02:52.085Z,5.6882,126.5476,76.08,6.2,mww,,25,1.676,1.05,us,us70005nbb,2019-09-29T10:36:50.966Z,84km SSE of Pondaguitan, Philippines,earthquake,7.4,5.4,0.071,19,reviewed,us,us                                   ",
"2019-09-28T21:28:09.034Z,56.284,120.036,10,5.1,mww,,38,7.595,0.63,us,us70005n8e,2019-09-28T21:46:49.040Z,122km ESE of Novaya Chara, Russia,earthquake,9.1,1.9,0.073,18,reviewed,us,us                                          ",
"2019-09-28T20:01:29.874Z,-6.4435,146.952,102.78,4.9,mb,,104,2.949,0.79,us,us70005n7n,2019-09-28T20:35:10.238Z,31km N of Lae, Papua New Guinea,earthquake,6.3,7.6,0.125,20,reviewed,us,us                                       ",
"2019-09-28T18:19:15.026Z,-35.2906,78.6659,10,5,mb,,59,2.652,0.65,us,us70005n6i,2019-09-28T18:37:10.040Z,300km NNE of Amsterdam Island, France,earthquake,10.2,1.1,0.093,37,reviewed,us,us                                      ",
"2019-09-28T17:09:36.103Z,14.0112,145.0772,107.3,4.6,mb,,119,0.465,0.64,us,us70005ndr,2019-09-29T11:02:36.500Z,20km SW of Rota, Northern Mariana Islands,earthquake,9.6,6.6,0.098,31,reviewed,us,us                             ",
"2019-09-28T07:23:29.806Z,-19.1622,-69.2914,110.91,4.6,mb,,105,0.511,0.69,us,us70005n1y,2019-09-28T07:40:41.040Z,110km SSE of Putre, Chile,earthquake,6.7,6.3,0.141,15,reviewed,us,us                                           ",
"2019-09-28T04:07:58.465Z,-22.6805,-177.1677,224.86,5.2,mww,,115,6.573,1.24,us,us70005n0r,2019-09-28T04:27:37.040Z,261km SW of Vaini, Tonga,earthquake,9.7,5.7,0.08,15,reviewed,us,us                                           ",
"2019-09-27T23:27:32.954Z,53.3431,-165.7898,10,4.8,mwr,,60,0.659,0.91,us,us70005myn,2019-09-28T05:05:25.186Z,77km SE of Unalaska, Alaska,earthquake,4,1.8,0.071,19,reviewed,us,us                                               ",
"2019-09-27T22:27:50.302Z,-23.5195,-179.7273,563.87,4.5,mb,,120,6.109,0.64,us,us70005mxj,2019-09-27T22:45:51.040Z,South of the Fiji Islands,earthquake,7.7,9.9,0.099,30,reviewed,us,us                                          ",
"2019-09-27T17:48:27.396Z,14.8964,52.3748,10,4.9,mb,,51,9.861,0.92,us,us70005mr0,2019-09-28T16:45:19.040Z,82km SSE of Haswayn, Yemen,earthquake,9.5,1.9,0.053,112,reviewed,us,us                                                ",
"2019-09-27T15:15:44.720Z,-18.7871,-172.6123,10,4.7,mb,,111,2.557,1.13,us,us70005mmm,2019-09-27T16:43:53.040Z,145km E of Neiafu, Tonga,earthquake,8,1.8,0.123,20,reviewed,us,us                                                 ",
"2019-09-27T15:11:29.576Z,-35.8969,-102.9008,10,5.8,mww,,40,24.929,1.12,us,us70005mls,2019-09-28T16:54:03.040Z,Southeast of Easter Island,earthquake,11.9,1.8,0.073,18,reviewed,us,us                                           ",
"2019-09-27T14:02:06.154Z,-30.0406,-177.8961,45.45,5,mb,,92,0.793,1.1,us,us70005mhf,2019-09-27T14:17:14.040Z,85km S of Raoul Island, New Zealand,earthquake,8.2,9.2,0.109,27,reviewed,us,us                                     ",
"2019-09-27T13:57:41.648Z,-15.2806,-72.1252,82.74,4.6,mb,,115,3.422,0.7,us,us70005mh9,2019-09-28T13:24:36.040Z,23km E of Orcopampa, Peru,earthquake,8.7,5.9,0.081,45,reviewed,us,us                                             ",
"2019-09-27T12:05:02.639Z,-30.1309,-177.8266,35,6,mww,,23,0.887,1.09,us,us70005mea,2019-09-28T12:10:58.934Z,96km S of Raoul Island, New Zealand,earthquake,8,1.9,0.073,18,reviewed,us,us                                        ",
"2019-09-27T11:21:24.548Z,-23.1829,-69.113,107.2,4.6,mwr,,62,0.635,0.89,us,us70005mde,2019-09-27T11:48:56.040Z,81km SSW of Calama, Chile,earthquake,5,5.2,,,reviewed,us,guc                                                     ",
"2019-09-27T11:11:00.454Z,38.8495,142.142,35,4.6,mb,,145,1.445,0.8,us,us70005mdc,2019-09-27T12:10:42.040Z,44km SE of Ofunato, Japan,earthquake,7.9,2,0.103,28,reviewed,us,us                                                    ",
"2019-09-27T10:58:29.213Z,37.8918,88.9886,10,5,mb,,81,9.315,1.02,us,us70005md4,2019-09-27T11:20:56.040Z,Southern Xinjiang, China,earthquake,8.6,1.9,0.05,129,reviewed,us,us                                                     ",
"2019-09-27T04:32:43.648Z,-8.9151,-75.03,35,4.5,mb,,114,3.535,0.54,us,us70005m7b,2019-09-27T05:05:15.040Z,54km SSW of Campoverde, Peru,earthquake,7.5,2,0.09,36,reviewed,us,us                                                  ",
"2019-09-27T03:51:38.530Z,19.092,-67.2023,8,4.7,ml,23,209,0.6311,0.43,pr,pr2019270000,2019-09-27T15:19:00.501Z,49km N of San Antonio, Puerto Rico,earthquake,1.65,31.61,0.38,14,reviewed,pr,pr                                  ",
"2019-09-27T03:32:29.758Z,41.9882,144.4739,42.37,4.6,mb,,169,0.981,0.88,us,us70005m6y,2019-09-27T03:53:56.040Z,109km S of Kushiro, Japan,earthquake,10.2,5.4,0.129,18,reviewed,us,us                                            ",
"2019-09-27T03:19:01.205Z,-55.3567,-27.925,10,5,mb,,109,19.547,0.55,us,us70005m74,2019-09-27T04:16:26.040Z,156km NNW of Visokoi Island, South Georgia and the South Sandwich Islands,earthquake,15.5,1.9,0.113,25,reviewed,us,us",
"2019-09-27T03:17:59.830Z,-8.2456,-74.2303,151.14,4.8,mb,,104,4.52,0.76,us,us70005m6j,2019-09-27T04:18:29.850Z,38km ENE of Pucallpa, Peru,earthquake,9.4,7.8,0.038,217,reviewed,us,us											",
"2019-09-27T02:29:39.877Z,-21.913,-179.3607,604.95,4.6,mb,,128,4.808,0.59,us,us70005m5n,2019-09-27T02:46:37.040Z,155km SSW of Ndoi Island, Fiji,earthquake,13.9,8.9,0.098,31,reviewed,us,us                                     ",
"2019-09-27T02:18:41.245Z,-25.7017,-177.2617,97.11,5.2,mb,,142,3.579,0.87,us,us70005m5h,2019-09-27T02:37:36.040Z,South of the Fiji Islands,earthquake,7.6,10.1,0.105,30,reviewed,us,us                                          ",
"2019-09-27T00:41:06.040Z,30.5305,131.1118,39.19,4.5,mb,,132,2.594,0.48,us,us70005m46,2019-09-27T05:27:08.040Z,24km SSE of Nishinoomote, Japan,earthquake,8.5,8.7,0.127,18,reviewed,us,us                                       ",
"2019-09-26T20:31:30.198Z,-29.8605,-71.4515,36.9,5.4,mww,,87,0.193,0.77,us,us70005lzd,2019-09-27T20:33:28.503Z,14km NW of Coquimbo, Chile,earthquake,5.3,5.3,0.073,18,reviewed,us,us                                            ",
"2019-09-26T19:15:33.016Z,10.7786,91.6454,10,4.7,mb,,112,1.386,0.96,us,us70005lxa,2019-09-26T19:46:50.040Z,155km SW of Port Blair, India,earthquake,9.2,1.9,0.088,39,reviewed,us,us                                             ",
"2019-09-26T19:07:43.623Z,-9.7326,159.7533,30.04,5.1,mb,,72,0.349,0.57,us,us70005lx6,2019-09-27T01:58:28.162Z,39km SSW of Honiara, Solomon Islands,earthquake,10.1,4,0.061,87,reviewed,us,us                                    ",
"2019-09-26T19:00:41.666Z,-13.4442,-111.2743,10,4.9,mb,,167,33.266,0.68,us,us70005lx1,2019-09-27T03:22:08.040Z,Central East Pacific Rise,earthquake,14.6,1.9,0.036,242,reviewed,us,us                                           ",
"2019-09-26T17:17:12.102Z,37.8593,88.6507,10.27,4.8,mb,,82,9.11,0.82,us,us70005lty,2019-09-26T19:54:39.040Z,275km E of Qiemo, China,earthquake,6.4,4.2,0.073,59,reviewed,us,us                                                  ",
"2019-09-26T16:36:18.131Z,-40.8158,-72.0028,129,6.1,mww,,30,0.442,0.77,us,us70005lt4,2019-09-27T17:37:57.821Z,30km WSW of Villa La Angostura, Argentina,earthquake,4.9,1.8,0.058,29,reviewed,us,us                              ",
"2019-09-26T13:07:00.211Z,-28.8,-176.0497,57.86,4.9,mb,,123,1.704,0.71,us,us70005lmz,2019-09-26T15:27:58.040Z,187km ENE of Raoul Island, New Zealand,earthquake,15.1,8.1,0.082,46,reviewed,us,us                                ",
"2019-09-26T13:02:08.857Z,28.0078,-20.1435,10,4.8,mb,,153,3.219,0.8,us,us70005lmr,2019-09-26T16:26:27.191Z,212km W of Frontera, Spain,earthquake,11.7,1.9,0.064,75,reviewed,us,us                                               ",
"2019-09-26T11:08:36.483Z,-7.2184,150.5153,38.23,5.1,mb,,80,3.968,0.99,us,us70005lkp,2019-09-26T11:35:49.040Z,153km SE of Kandrian, Papua New Guinea,earthquake,8.2,7.1,0.059,92,reviewed,us,us                                 ",
"2019-09-26T10:59:26.201Z,40.89,28.1727,10,5.7,mww,,25,1.612,1.19,us,us70005lkl,2019-09-29T12:32:52.951Z,20km ESE of Marmaraereglisi, Turkey,earthquake,5.3,1.8,0.057,30,reviewed,us,us                                         ",
"2019-09-26T10:31:40.367Z,26.0579,129.3788,10,4.8,mb,,61,1.258,1.16,us,us70005lkc,2019-09-26T11:29:54.040Z,151km ESE of Nago, Japan,earthquake,5.5,1.9,0.067,70,reviewed,us,us                                                  ",
"2019-09-26T09:47:00.912Z,-14.1076,167.5123,166.92,4.5,mb,,161,1.364,0.8,us,us70005lk8,2019-09-26T11:46:21.040Z,25km S of Sola, Vanuatu,earthquake,13.3,5.1,0.113,23,reviewed,us,us                                             ",
"2019-09-26T07:01:26.738Z,33.1606,73.7294,10,4.7,mb,,171,0.622,0.97,us,us70005lie,2019-09-28T04:52:39.338Z,4km WNW of New Mirpur, Pakistan,earthquake,9.1,1.9,0.147,14,reviewed,us,us                                           ",
"2019-09-26T06:57:06.783Z,38.6627,73.4594,146.59,4.5,mb,,70,1.815,0.72,us,us70005lid,2019-09-26T10:28:41.040Z,38km SSW of Karakul, Tajikistan,earthquake,7.3,4.4,0.15,14,reviewed,us,us                                         ",
"2019-09-26T02:12:25.355Z,43.129,145.505,35,4.8,mb,,119,2.06,0.72,us,us70005lgt,2019-09-26T02:44:57.040Z,22km SSW of Nemuro, Japan,earthquake,3.4,2,0.124,20,reviewed,us,us                                                     ",
"2019-09-26T01:22:25.381Z,54.8805,111.6274,10,4.6,mb,,95,7.584,0.78,us,us70005lgk,2019-09-26T01:43:20.040Z,107km NE of Kurumkan, Russia,earthquake,8.1,1.8,0.082,45,reviewed,us,us                                              ",
"2019-09-26T00:39:59.541Z,-3.6093,128.4829,10.98,5.4,mww,,25,3.821,1.13,us,us70005lg7,2019-09-27T17:01:31.040Z,10km S of Pelau, Indonesia,earthquake,2.4,3.7,0.071,19,reviewed,us,us                                            ",
"2019-09-25T23:46:44.575Z,-3.45,128.3471,18.16,6.5,mww,,15,3.931,0.87,us,us70005lfd,2019-09-29T00:30:11.712Z,10km S of Kairatu, Indonesia,earthquake,6.5,3,0.042,54,reviewed,us,us                                              ",
"2019-09-25T23:44:27.225Z,-8.3234,119.8153,185.43,4.6,mb,,46,2.416,1.3,us,us70005lfa,2019-09-26T02:37:28.040Z,19km NNW of Cempa, Indonesia,earthquake,5.4,6.4,0.073,56,reviewed,us,us                                           ",
"2019-09-25T20:57:35.252Z,8.8428,126.588,35,4.8,mb,,90,2.025,0.83,us,us70005lcz,2019-09-25T21:54:57.040Z,31km E of Aras-asan, Philippines,earthquake,11.1,2,0.097,33,reviewed,us,us                                             ",
"2019-09-25T20:18:30.732Z,-40.5054,-16.7943,10,5.4,mb,,94,19.084,1.01,us,us70005lby,2019-09-26T20:20:10.111Z,Southern Mid-Atlantic Ridge,earthquake,12.1,1.8,0.069,72,reviewed,us,us                                            ",
"2019-09-25T20:15:54.146Z,-40.6896,-16.8264,10,5.2,mb,,52,18.923,1.15,us,us70005lbu,2019-09-25T21:56:37.040Z,Southern Mid-Atlantic Ridge,earthquake,12.6,1.8,0.076,57,reviewed,us,us                                            ",
"2019-09-25T19:54:28.502Z,-5.8699,148.1332,100.21,5.2,mww,,43,3.642,0.81,us,us70005las,2019-09-25T21:36:33.439Z,86km NNE of Finschhafen, Papua New Guinea,earthquake,7.2,6.3,0.071,19,reviewed,us,us                            ",
"2019-09-25T19:43:22.763Z,-27.8768,-66.7618,156.52,5.3,mww,,27,2.347,0.67,us,us70005laf,2019-09-25T23:59:37.241Z,36km SE of Belen, Argentina,earthquake,7.5,6.5,0.063,24,reviewed,us,us                                         ",
"2019-09-25T15:57:33.488Z,-4.2616,142.7992,52.57,5.3,mww,,43,5.064,0.96,us,us70005l6a,2019-09-26T07:36:41.772Z,5km WSW of Ambunti, Papua New Guinea,earthquake,8,6.7,0.069,20,reviewed,us,us                                    ",
"2019-09-25T15:21:51.419Z,33.601,25.3653,12.2,4.5,mb,,115,1.728,0.54,us,us70005l68,2019-09-26T02:13:04.040Z,156km S of Pirgos, Greece,earthquake,8.3,5.4,0.102,28,reviewed,us,us                                                ",
"2019-09-25T14:39:27.434Z,-7.0895,125.1385,547.4,4.6,mb,,78,2.785,0.89,us,us70005l5b,2019-09-26T05:30:18.040Z,169km NNW of Dili, East Timor,earthquake,12.3,9.7,0.102,29,reviewed,us,us                                         ",
"2019-09-25T13:44:37.322Z,17.9722,-73.6104,10,4.6,mb,,59,2.407,0.91,us,us70005l4q,2019-09-26T00:58:57.079Z,29km SSE of Les Cayes, Haiti,earthquake,6.3,1.9,0.035,250,reviewed,us,us                                             ",
"2019-09-25T13:04:41.956Z,-17.6924,-178.7326,546.43,4.9,mb,,55,3.064,0.96,us,us70005l3i,2019-09-25T13:23:54.040Z,245km SE of Lambasa, Fiji,earthquake,12,8.7,0.085,44,reviewed,us,us                                            ",
"2019-09-25T09:29:33.720Z,34.5648,141.873,10,4.9,mb,,156,2.242,1.03,us,us70005l24,2019-09-25T09:58:05.040Z,155km ESE of Ohara, Japan,earthquake,8.1,1.9,0.067,69,reviewed,us,us                                                 ",
"2019-09-25T08:28:49.507Z,39.3626,142.0968,51.73,4.9,mb,,133,1.63,0.94,us,us70005l1w,2019-09-25T08:50:23.040Z,16km E of Otsuchi, Japan,earthquake,7.5,3.3,0.072,60,reviewed,us,us                                               ",
"2019-09-25T07:28:08.470Z,-58.5813,-25.8601,10,4.8,mb,,194,7.295,0.66,us,us70005l1b,2019-09-25T08:36:02.040Z,63km NE of Bristol Island, South Sandwich Islands,earthquake,13.4,2,0.086,42,reviewed,us,us                        ",
"2019-09-25T04:29:11.039Z,-17.6103,-172.8779,10,5.2,mb,,52,3.829,0.93,us,us70005l06,2019-09-25T04:53:20.040Z,164km NE of Neiafu, Tonga,earthquake,7.5,1.9,0.033,298,reviewed,us,us                                              ",
"2019-09-25T01:02:05.351Z,-20.9451,-178.7687,589.83,4.8,mb,,94,4.374,0.76,us,us70005ky0,2019-09-25T01:35:06.040Z,33km SSW of Ndoi Island, Fiji,earthquake,7.7,6.6,0.033,288,reviewed,us,us                                      ",
"2019-09-25T00:12:09.810Z,19.086,-67.2033,12,4.84,md,27,208,0.6253,0.4,pr,pr2019268001,2019-09-27T01:45:49.482Z,65km N of San Antonio, Puerto Rico,earthquake,1.64,31.61,0.53,19,reviewed,pr,pr                                 ",
"2019-09-24T21:29:40.243Z,-33.7801,56.1986,10,4.9,mb,,80,11.894,0.53,us,us60005n7b,2019-09-24T22:31:51.040Z,Southwest Indian Ridge,earthquake,9.1,1.7,0.11,26,reviewed,us,us                                                    ",
"2019-09-24T21:25:10.478Z,-33.7856,56.3123,10,5.1,mb,,86,11.965,0.46,us,us60005n75,2019-09-24T22:16:46.040Z,Southwest Indian Ridge,earthquake,7.4,1.9,0.094,37,reviewed,us,us                                                   ",
"2019-09-24T21:19:47.737Z,-33.8163,56.2497,10,6.1,mww,,27,11.949,0.69,us,us60005n52,2019-09-25T04:53:49.040Z,Southwest Indian Ridge,earthquake,9.1,1.8,0.073,18,reviewed,us,us                                                  ",
"2019-09-24T21:12:01.296Z,-33.8121,56.317,10,5.1,mww,,51,11.986,0.68,us,us60005n4s,2019-09-24T21:27:33.040Z,Southwest Indian Ridge,earthquake,10.9,1.9,0.075,17,reviewed,us,us                                                  ",
"2019-09-24T13:38:14.760Z,56.9606,1.8201,10,4.6,mb,,70,3.258,0.52,us,us60005msj,2019-09-24T21:40:44.488Z,224km ESE of Boddam, United Kingdom,earthquake,6.4,1.9,0.067,67,reviewed,us,us                                         ",
"2019-09-24T11:01:55.219Z,33.1062,73.7655,10,5.6,mwb,,46,0.683,0.88,us,us60005mqp,2019-09-28T14:51:09.151Z,3km S of New Mirpur, Pakistan,earthquake,6.7,1.8,0.034,82,reviewed,us,us                                             ",
"2019-09-24T10:27:01.125Z,-7.5504,128.3992,157.12,4.5,mb,,59,2.905,0.94,us,us60005mq5,2019-09-24T10:54:49.040Z,Kepulauan Barat Daya, Indonesia,earthquake,7.5,9.3,0.124,19,reviewed,us,us                                       ",
"2019-09-24T10:15:56.525Z,5.6201,-79.681,10,4.7,mb,,131,3.526,1.19,us,us60005mq0,2019-09-24T10:42:28.040Z,214km SSE of Tonosi, Panama,earthquake,7.7,1.9,0.086,41,reviewed,us,us                                                ",
"2019-09-24T09:42:46.148Z,14.9623,119.9214,36.09,4.9,mb,,50,7.89,0.72,us,us60005mpk,2019-09-24T10:07:47.040Z,16km W of San Nicolas, Philippines,earthquake,6.8,6.6,0.057,95,reviewed,us,us                                      ",
"2019-09-24T09:02:00.980Z,31.8691,49.6708,32.22,4.7,mb,,60,4.624,0.66,us,us60005mnv,2019-09-24T11:56:46.957Z,35km ESE of Masjed Soleyman, Iran,earthquake,7,5.3,0.05,124,reviewed,us,us                                         ",
"2019-09-24T08:00:24.344Z,40.8722,28.2498,10,4.9,mb,,38,2.277,0.89,us,us60005mmr,2019-09-26T17:45:17.842Z,23km S of Silivri, Turkey,earthquake,6.3,1.9,0.055,103,reviewed,us,us                                                 ",
"2019-09-24T07:48:57.960Z,34.2533,26.232,10,4.9,mww,,43,1.499,1.2,us,us60005mmg,2019-09-25T07:51:07.806Z,90km SSE of Makry Gialos, Greece,earthquake,6.5,1.8,0.08,15,reviewed,us,us                                             ",
"2019-09-24T07:18:38.318Z,-20.8894,-178.3929,536.29,5.3,mb,,38,4.587,0.86,us,us60005mlv,2019-09-24T07:37:26.040Z,41km SE of Ndoi Island, Fiji,earthquake,6.2,6.9,0.025,545,reviewed,us,us                                       ",
"2019-09-24T03:51:38.217Z,-18.1748,120.3366,10,4.5,mb,,107,3.023,0.5,us,us60005mji,2019-09-24T04:10:33.040Z,202km W of Broome, Australia,earthquake,4.1,2,0.313,3,reviewed,us,us                                                ",
"2019-09-24T03:32:41.200Z,19.0225,-67.2081,5,5.06,ml,204,,0.6459,0.57,pr,pr2019267004,2019-09-27T18:49:36.165Z,54km NNW of San Antonio, Puerto Rico,earthquake,3.27,31.61,0.18,19,reviewed,pr,pr                                ",
"2019-09-24T03:23:40.000Z,19.077,-67.2701,10,6,mw,25,193,0.6299,0.88,pr,pr2019267000,2019-09-29T13:46:58.111Z,69km NNW of San Antonio, Puerto Rico,earthquake,3.8,31.61,0.51,25,reviewed,pr,pr                                  ",
"2019-09-23T21:55:00.415Z,52.2091,159.7446,35,4.9,mb,,109,1.053,1.27,us,us60005mhe,2019-09-23T22:19:15.040Z,119km SE of Petropavlovsk-Kamchatskiy, Russia,earthquake,7.5,2,0.038,216,reviewed,us,us                             ",
"2019-09-23T17:51:10.043Z,52.531,-166.8783,10,5.3,mww,,170,1.08,1.02,us,us60005mbn,2019-09-28T18:01:25.044Z,141km ESE of Nikolski, Alaska,earthquake,4.5,1.9,0.05,38,reviewed,us,us                                             ",
"2019-09-23T14:34:46.470Z,8.9085,126.5491,59.02,4.7,mb,,122,2.064,0.8,us,us60005m8c,2019-09-23T15:26:19.040Z,27km E of Aras-asan, Philippines,earthquake,10.2,7.2,0.079,49,reviewed,us,us                                       ",
"2019-09-23T08:54:22.607Z,11.0555,138.6312,10,5.2,mb,,53,6.594,0.81,us,us60005m5b,2019-09-23T09:14:19.040Z,166km NNE of Rumung, Micronesia,earthquake,9.3,1.8,0.033,302,reviewed,us,us                                          ",
"2019-09-23T08:24:39.314Z,-36.0408,-73.7934,10,5.3,mww,,71,0.857,0.83,us,us60005m4u,2019-09-23T11:22:52.674Z,96km NW of Talcahuano, Chile,earthquake,4.9,1.9,0.063,24,reviewed,us,us                                            ",
"2019-09-22T22:32:24.886Z,-6.8755,102.6096,10,5.1,mb,,124,2.522,0.88,us,us60005m1i,2019-09-22T23:22:17.040Z,232km SW of Biha, Indonesia,earthquake,8.7,1.9,0.076,56,reviewed,us,us                                              ",
"2019-09-22T22:12:31.770Z,18.6719,-103.8229,35,4.6,mb,,220,2.638,0.77,us,us60005m18,2019-09-23T23:18:14.708Z,16km WSW of Coahuayana, Mexico,earthquake,10.8,2,0.03,326,reviewed,us,us                                           ",
"2019-09-22T20:08:41.965Z,41.5098,19.6156,10,4.5,mb,,47,0.956,1.22,us,us60005m0j,2019-09-23T16:34:00.019Z,9km WNW of Fushe-Kruje, Albania,earthquake,6.3,2,0.384,2,reviewed,us,us                                               ",
"2019-09-22T16:29:55.462Z,-18.1626,-178.2394,563.37,4.7,mb,,70,3.553,0.72,us,us60005lzs,2019-09-23T14:06:50.040Z,279km N of Ndoi Island, Fiji,earthquake,8.6,8.4,0.027,399,reviewed,us,us                                       ",
"2019-09-22T14:15:27.121Z,29.5068,141.3,49.27,4.6,mb,,110,2.525,0.97,us,us60005lze,2019-09-22T15:16:45.040Z,283km NNW of Chichi-shima, Japan,earthquake,10.6,7.6,0.05,120,reviewed,us,us                                        ",
"2019-09-22T13:42:11.253Z,36.6826,71.0784,210.77,4.5,mb,,60,0.965,0.57,us,us60005lz8,2019-09-24T13:23:33.638Z,29km SE of Jarm, Afghanistan,earthquake,8.1,6.8,0.066,67,reviewed,us,us                                           ",
"2019-09-22T08:58:54.975Z,-4.7165,155.0856,497.73,4.5,mb,,110,2.959,0.76,us,us60005lyh,2019-09-22T09:18:20.040Z,172km NNW of Arawa, Papua New Guinea,earthquake,12.4,9,0.087,39,reviewed,us,us                                  ",
"2019-09-22T07:32:33.799Z,-15.5519,-173.1298,8.61,5.6,mww,,64,4.651,1.04,us,us60005ly5,2019-09-23T07:34:14.300Z,79km ENE of Hihifo, Tonga,earthquake,12,3.7,0.073,18,reviewed,us,us                                             ",
"2019-09-22T05:28:24.321Z,-14.6949,-73.6153,66.56,4.9,mb,,130,4.135,0.81,us,us60005lxn,2019-09-22T06:35:48.767Z,34km ENE of Tambo, Peru,earthquake,8.2,6.9,0.059,88,reviewed,us,us                                              ",
"2019-09-22T05:02:47.820Z,36.1658,68.4423,14.9,4.9,mb,,106,1.416,1.27,us,us60005lxa,2019-09-22T06:02:48.586Z,24km W of Baghlan, Afghanistan,earthquake,6.8,4.7,0.053,110,reviewed,us,us                                         ",
"2019-09-22T02:31:23.694Z,24.2879,93.727,54.02,4.5,mb,,154,1.642,0.97,us,us60005lwz,2019-09-22T02:50:26.040Z,7km SE of Churachandpur, India,earthquake,11.6,8.8,0.18,9,reviewed,us,us                                           ",
"2019-09-22T01:50:24.986Z,16.0402,-93.929,91.14,4.9,mb,,154,1.739,1.05,us,us60005lwj,2019-09-22T03:14:50.409Z,6km W of Paredon, Mexico,earthquake,9.1,7.9,0.036,238,reviewed,us,us                                              ",
"2019-09-22T01:25:18.117Z,-31.7315,-176.2762,10,5.2,mb,,77,2.859,0.99,us,us60005lwe,2019-09-22T03:56:47.138Z,251km E of L'Esperance Rock, New Zealand,earthquake,13.6,1.8,0.046,155,reviewed,us,us                              ",
"2019-09-22T00:36:45.396Z,6.807,-73.0205,161.45,4.9,mb,,35,0.91,1.18,us,us60005lvz,2019-09-26T15:46:34.043Z,12km N of Aratoca, Colombia,earthquake,6.4,3.5,0.025,511,reviewed,us,us                                             ",
"2019-09-21T23:52:46.500Z,31.2848,140.4924,17.8,4.7,mb,,94,1.913,0.5,us,us60005lvn,2019-09-22T00:16:34.040Z,209km SSE of Hachijo-jima, Japan,earthquake,11.7,5.4,0.101,30,reviewed,us,us                                        ",
"2019-09-21T23:00:46.117Z,51.1023,179.0374,28.81,4.7,mb,,162,0.32,0.94,us,us60005lv9,2019-09-22T00:48:39.948Z,101km SSE of Little Sitkin Island, Alaska,earthquake,8.3,5.5,0.036,239,reviewed,us,us                             ",
"2019-09-21T22:51:11.604Z,11.9885,-87.7443,35,4.6,mb,,157,0.997,0.8,us,us60005lv5,2019-09-21T23:10:06.040Z,82km SW of Corinto, Nicaragua,earthquake,6.2,2,0.067,66,reviewed,us,us                                               ",
"2019-09-21T22:07:31.006Z,41.3664,19.5147,10,4.8,mb,,41,1.079,0.82,us,us60005lut,2019-09-22T23:04:04.707Z,4km WNW of Shijak, Albania,earthquake,4.9,1.9,0.058,91,reviewed,us,us                                                 ",
"2019-09-21T21:32:34.852Z,5.4315,126.4293,63.39,4.9,mb,,112,1.833,1.08,us,us60005luq,2019-09-21T21:50:22.040Z,102km ESE of Caburan, Philippines,earthquake,6.3,6.2,0.066,71,reviewed,us,us                                      ",
"2019-09-21T19:55:48.078Z,40.3429,14.9139,294.63,4.7,mb,,72,0.736,1.36,us,us60005ltu,2019-09-23T22:26:50.688Z,7km W of Agropoli, Italy,earthquake,8.3,8.1,0.094,34,reviewed,us,us                                               ",
"2019-09-21T19:53:10.976Z,-6.5102,130.446,48.47,5.9,mww,,30,1.689,1.21,us,us60005lts,2019-09-22T19:55:10.936Z,186km NNW of Saumlaki, Indonesia,earthquake,5.4,5.4,0.073,18,reviewed,us,us                                       ",
"2019-09-21T18:48:16.165Z,-30.3403,-67.8277,68.08,4.6,mb,,55,1.409,1.09,us,us60005lt9,2019-09-24T15:45:54.970Z,47km NW of San Agustin de Valle Fertil, Argentina,earthquake,7.9,4.4,0.157,13,reviewed,us,us                     ",
"2019-09-21T16:10:37.802Z,41.3776,19.5025,10,4.7,mb,,51,1.066,1.04,us,us60005ls8,2019-09-21T22:42:43.407Z,6km WNW of Shijak, Albania,earthquake,2,2,0.245,5,reviewed,us,us                                                      ",
"2019-09-21T14:15:52.355Z,41.4255,19.5389,10,5.1,mww,,41,1.024,1.12,us,us60005lrg,2019-09-22T10:32:46.148Z,9km NNW of Shijak, Albania,earthquake,4.5,1.9,0.062,25,reviewed,us,us                                                ",
"2019-09-21T14:04:24.925Z,41.3807,19.4543,10,5.6,mww,,51,1.058,1.2,us,us60005lrf,2019-09-26T16:55:01.766Z,6km N of Durres, Albania,earthquake,4.1,2,0.05,39,reviewed,us,us                                                      ",
"2019-09-21T11:30:58.116Z,38.6512,70.1729,20.96,4.6,mb,,104,0.365,0.68,us,us60005lqr,2019-09-21T13:19:53.040Z,30km ESE of Roghun, Tajikistan,earthquake,5.5,6.1,0.133,17,reviewed,us,us                                         ",
"2019-09-21T05:57:04.061Z,8.911,126.5893,10,4.7,mb,,127,2.085,0.52,us,us60005lpf,2019-09-21T06:27:22.040Z,31km E of Aras-asan, Philippines,earthquake,7.3,1.9,0.092,36,reviewed,us,us                                           ",
"2019-09-21T02:41:10.510Z,46.1912,106.7111,10,4.8,mb,,56,1.669,0.61,us,us60005lnb,2019-09-21T02:57:04.040Z,0km NNW of Tsant, Mongolia,earthquake,10.4,1.9,0.068,67,reviewed,us,us                                               ",
"2019-09-21T01:00:30.129Z,-49.837,-111.7455,10,4.7,mb,,156,28.457,0.58,us,us70005mk0,2019-09-28T00:15:55.040Z,Southern East Pacific Rise,earthquake,10.6,1.9,0.152,13,reviewed,us,us                                            ",
"2019-09-21T00:36:06.714Z,-22.1422,-68.3663,98.33,4.5,mwr,,32,0.824,1.09,us,us60005lmx,2019-09-21T05:21:32.040Z,68km ENE of Calama, Chile,earthquake,6.3,5.6,0.054,33,reviewed,us,us                                            ",
"2019-09-20T23:16:06.286Z,-1.0237,128.5799,10,4.6,mb,,65,2.157,0.68,us,us60005lm7,2019-09-20T23:42:22.040Z,107km ENE of Laiwui, Indonesia,earthquake,4.7,1.8,0.105,27,reviewed,us,us                                            ",
"2019-09-20T21:22:18.983Z,-8.3755,116.6675,10,4.6,mb,,79,2.49,0.52,us,us60005lkp,2019-09-20T22:22:31.223Z,2km W of Sambelia, Indonesia,earthquake,7.2,1.9,0.158,12,reviewed,us,us                                               ",
"2019-09-20T21:10:05.058Z,-18.9887,-172.2875,10,4.6,mb,,140,11.964,0.45,us,us70005mjz,2019-09-28T04:01:31.040Z,182km ESE of Neiafu, Tonga,earthquake,11.6,1.8,0.122,20,reviewed,us,us                                           ",
"2019-09-20T20:59:15.378Z,-0.9455,128.6576,10,5,mww,,27,2.139,0.74,us,us60005lk6,2019-09-21T15:50:25.040Z,118km ENE of Laiwui, Indonesia,earthquake,6.8,1.8,0.073,18,reviewed,us,us                                             ",
"2019-09-20T19:49:29.948Z,-23.6408,-179.664,531.2,4.6,mb,,108,6.243,0.81,us,us60005liv,2019-09-21T14:37:23.040Z,South of the Fiji Islands,earthquake,12.3,9.5,0.087,44,reviewed,us,us                                           ",
"2019-09-20T18:20:07.653Z,-17.3343,166.9532,10,5.4,mb,,66,1.891,0.94,us,us60005lhn,2019-09-21T18:22:11.289Z,143km SSW of Lakatoro, Vanuatu,earthquake,6.2,1.8,0.037,255,reviewed,us,us                                          ",
"2019-09-20T18:04:21.759Z,13.9475,124.4802,16.39,4.8,mb,,127,9.866,0.54,us,us60005lhv,2019-09-21T13:57:36.040Z,19km ENE of Panganiban, Philippines,earthquake,11.6,5.1,0.072,60,reviewed,us,us                                  ",
"2019-09-20T16:33:52.935Z,-28.53,-71.4979,43.4,4.5,mwr,,182,0.494,0.66,us,us60005lg4,2019-09-21T04:47:45.771Z,72km W of Vallenar, Chile,earthquake,4.6,10.8,,,reviewed,us,guc                                                   ",
"2019-09-20T09:19:12.692Z,-18.3599,-172.4288,10,5.1,mb,,38,12.247,0.78,us,us60005l9u,2019-09-20T09:46:36.040Z,167km E of Neiafu, Tonga,earthquake,12.4,1.8,0.032,325,reviewed,us,us                                             ",
"2019-09-20T09:13:40.322Z,-18.2943,-172.5962,10,5.3,mww,,48,6.621,0.98,us,us60005l9s,2019-09-20T09:34:47.040Z,151km ENE of Neiafu, Tonga,earthquake,7.2,1.8,0.075,17,reviewed,us,us                                             ",
"2019-09-20T08:00:14.150Z,-18.2601,-172.115,10,5,mb,,68,2.227,0.8,us,us60005l8v,2019-09-20T08:22:16.040Z,202km ENE of Neiafu, Tonga,earthquake,10.2,1.9,0.1,32,reviewed,us,us                                                   ",
"2019-09-20T05:28:25.262Z,-18.2479,-172.0847,10,5.4,mb,,73,2.205,0.84,us,us60005l72,2019-09-21T05:30:15.348Z,205km ENE of Neiafu, Tonga,earthquake,8,1.8,0.062,89,reviewed,us,us                                                ",
"2019-09-20T01:59:17.892Z,-31.572,-177.7509,10,4.8,mb,,129,8.913,0.81,us,us60005l6a,2019-09-20T02:51:45.040Z,110km E of L'Esperance Rock, New Zealand,earthquake,10.7,1.9,0.127,19,reviewed,us,us                               ",
"2019-09-19T23:59:41.500Z,-4.982,151.602,145.06,5.1,mww,,32,0.964,0.88,us,us60005l5f,2019-09-21T03:09:35.040Z,101km SW of Kokopo, Papua New Guinea,earthquake,8.1,5,0.071,19,reviewed,us,us                                     ",
"2019-09-19T19:43:09.622Z,41.3549,83.8232,10,4.5,mb,,83,4.204,0.41,us,us60005l30,2019-09-19T20:48:53.040Z,84km ESE of Kuqa, China,earthquake,9.3,1.1,0.113,23,reviewed,us,us                                                    ",
"2019-09-19T19:09:50.778Z,3.566,127.2414,47.3,5,mb,,110,2.778,0.76,us,us60005l2m,2019-09-19T20:50:37.040Z,220km NNW of Tobelo, Indonesia,earthquake,5.1,7.1,0.048,135,reviewed,us,us                                            ",
"2019-09-19T18:33:16.651Z,37.6057,20.7135,9.05,4.7,mb,,97,1.055,0.96,us,us60005l2f,2019-09-21T05:57:36.141Z,16km SSW of Mouzaki, Greece,earthquake,6.2,4.4,0.09,37,reviewed,us,us                                               ",
"2019-09-19T17:28:06.260Z,-9.1006,124.0821,77.01,4.5,mb,,84,0.675,1.32,us,us60005l1w,2019-09-19T18:15:25.040Z,57km NW of Kefamenanu, Indonesia,earthquake,5.8,7.3,0.116,22,reviewed,us,us                                       ",
"2019-09-19T16:02:26.441Z,-22.7862,-175.0361,10,5.1,mb,,116,6.035,0.87,us,us60005kzs,2019-09-20T16:32:13.040Z,161km S of `Ohonua, Tonga,earthquake,9.4,1.8,0.044,170,reviewed,us,us                                             ",
"2019-09-19T13:52:03.116Z,-23.8155,-179.7796,529.52,4.5,mb,,182,5.655,0.6,us,us60005kyi,2019-09-19T14:21:43.040Z,South of the Fiji Islands,earthquake,11,13.8,0.118,21,reviewed,us,us                                           ",
"2019-09-19T11:47:21.778Z,6.7197,126.1988,81.08,4.5,mb,,135,0.706,0.82,us,us60005kxp,2019-09-26T11:39:48.040Z,10km E of Talisay, Philippines,earthquake,8.4,5.2,0.104,27,reviewed,us,us                                         ",
"2019-09-19T10:32:04.479Z,-5.8888,125.9209,522.17,4.8,mb,,75,4.176,0.83,us,us60005kx8,2019-09-19T10:49:08.040Z,242km SSW of Leksula, Indonesia,earthquake,12.2,10.6,0.107,27,reviewed,us,us                                     ",
"2019-09-19T09:42:57.499Z,-21.9607,-68.6941,122.56,4.5,mb,,42,0.534,0.8,us,us60005kwu,2019-09-20T06:50:35.040Z,61km NNE of Calama, Chile,earthquake,6.4,6.9,0.145,14,reviewed,us,us                                             ",
"2019-09-19T07:32:58.846Z,-6.0449,111.9047,638.28,5.7,mb,,43,1.763,0.7,us,us60005kuc,2019-09-20T07:35:29.229Z,76km NNE of Blimbing, Indonesia,earthquake,10.6,8.6,0.068,77,reviewed,us,us                                       ",
"2019-09-19T07:32:00.228Z,-6.0891,111.8863,591.18,6,mww,,31,1.724,1.23,us,us60005ku0,2019-09-22T15:26:06.040Z,71km NNE of Sumbersari, Indonesia,earthquake,6.6,6,0.055,32,reviewed,us,us                                        ",
"2019-09-19T07:06:33.338Z,-6.0562,111.863,611.76,6.2,mww,,19,1.723,0.93,us,us60005kta,2019-09-23T16:54:55.719Z,73km NNE of Pendok, Indonesia,earthquake,9.4,5.7,0.056,31,reviewed,us,us                                         ",
"2019-09-19T02:50:39.159Z,-4.2169,127.5457,240.06,4.5,mb,,171,9.275,0.49,us,us60005krn,2019-09-19T07:23:32.988Z,85km SW of Amahusu, Indonesia,earthquake,14.5,13.4,0.163,11,reviewed,us,us                                      ",
"2019-09-18T23:49:28.726Z,36.4392,140.6462,53,4.5,mb,,142,1.431,1.01,us,us60005kqd,2019-09-20T07:39:37.398Z,7km ESE of Funaishikawa, Japan,earthquake,5,7.6,0.125,19,reviewed,us,us                                             ",
"2019-09-18T20:54:05.654Z,-18.1197,-174.705,190.5,4.8,mb,,76,4.63,0.82,us,us70005i12,2019-09-18T22:44:57.040Z,96km NW of Neiafu, Tonga,earthquake,10.6,10.4,0.098,32,reviewed,us,us                                             ",
"2019-09-18T19:34:52.458Z,19.5217,-69.8981,10,4.5,mb,,124,0.788,1.41,us,us70005hz7,2019-09-19T05:43:43.028Z,2km N of Arroyo Salado, Dominican Republic,earthquake,3.7,2,0.144,9,reviewed,us,us                                  ",
"2019-09-18T16:10:18.238Z,-9.8653,150.1953,10,5.1,mb,,126,3.028,0.69,us,us70005hw4,2019-09-18T21:12:01.040Z,57km NNW of Alotau, Papua New Guinea,earthquake,8.7,1.9,0.087,43,reviewed,us,us                                     ",
"2019-09-18T15:22:37.217Z,44.6411,146.8803,131.49,4.8,mb,,111,3.117,0.76,us,us70005hvy,2019-09-18T16:12:47.040Z,94km N of Shikotan, Russia,earthquake,8.9,7.9,0.053,108,reviewed,us,us                                          ",
"2019-09-18T14:46:24.313Z,-10.5339,152.385,31.83,5.3,mb,,50,5.268,0.73,us,us70005hvv,2019-09-18T18:37:41.040Z,168km SSW of Kulumadau, Papua New Guinea,earthquake,9,5.7,0.057,105,reviewed,us,us                                ",
"2019-09-18T12:04:04.549Z,5.3859,126.2811,76.25,4.7,mb,,87,1.812,0.9,us,us70005huq,2019-09-18T12:28:13.040Z,90km E of Sarangani, Philippines,earthquake,8.9,8.3,0.082,45,reviewed,us,us                                         ",
"2019-09-18T11:54:59.044Z,-54.2141,7.8922,10,5.4,mb,,62,18.133,0.63,us,us70005hul,2019-09-19T11:56:46.859Z,295km E of Bouvet Island, Bouvet Island,earthquake,11.9,1.9,0.069,72,reviewed,us,us                                  ",
"2019-09-18T11:23:28.664Z,9.4437,-84.0036,44.26,4.7,mb,,135,0.295,1.14,us,us70005hui,2019-09-19T02:03:40.096Z,17km E of Quepos, Costa Rica,earthquake,6.5,5.9,0.126,19,reviewed,us,us                                           ",
"2019-09-18T08:48:17.146Z,-17.6193,-178.6482,537.35,4.6,mb,,81,3.147,0.55,us,us70005ht7,2019-09-18T09:26:42.040Z,248km ESE of Lambasa, Fiji,earthquake,15,9,0.109,25,reviewed,us,us                                             ",
"2019-09-18T07:01:01.942Z,5.4226,126.5621,23.06,5.5,mww,,86,1.905,1.42,us,us70005hsp,2019-09-19T07:03:01.755Z,112km SSE of Pondaguitan, Philippines,earthquake,7.4,5.2,0.073,18,reviewed,us,us                                  ",
"2019-09-18T06:26:09.166Z,-6.8469,154.2007,92.19,5.1,mb,,51,3.327,1.35,us,us70005hsh,2019-09-18T06:45:36.040Z,153km WSW of Panguna, Papua New Guinea,earthquake,7.8,7.1,0.056,106,reviewed,us,us                                ",
"2019-09-18T06:22:48.827Z,-3.9107,151.4934,10,5.1,mb,,84,0.724,1.07,us,us70005hse,2019-09-18T06:39:19.040Z,81km WNW of Rabaul, Papua New Guinea,earthquake,6,1.7,0.064,80,reviewed,us,us                                        ",
"2019-09-18T04:58:53.346Z,9.7854,-82.8431,16.46,4.8,mb,,81,0.302,0.94,us,us70005hrz,2019-09-18T15:20:57.687Z,31km SE of Puerto Limon, Costa Rica,earthquake,3.9,4.5,0.059,88,reviewed,us,us                                     ",
"2019-09-18T03:58:52.512Z,-0.5833,127.9931,22.79,5.1,mb,,67,1.484,0.96,us,us70005hrt,2019-09-18T04:14:18.040Z,92km NNE of Laiwui, Indonesia,earthquake,5.4,5.6,0.08,51,reviewed,us,us                                           ",
"2019-09-18T02:54:28.526Z,44.5608,148.0628,68.57,5,mww,,58,3.948,0.7,us,us70005hr6,2019-09-27T02:03:05.040Z,76km S of Kuril'sk, Russia,earthquake,8.2,4.3,0.073,18,reviewed,us,us                                               ",
"2019-09-18T01:42:20.615Z,-17.9383,-172.0583,10,4.6,mb,,201,2.317,0.61,us,us70005lqd,2019-09-27T01:35:55.040Z,218km ENE of Neiafu, Tonga,earthquake,10.2,2,0.136,16,reviewed,us,us                                              ",
"2019-09-17T19:29:56.882Z,35.3483,46.2087,18.67,4.6,mb,,57,0.461,0.88,us,us70005hlq,2019-09-18T15:49:44.040Z,27km NE of Halabjah, Iraq,earthquake,3.1,5.1,0.054,102,reviewed,us,us                                              ",
"2019-09-17T19:11:42.619Z,14.4998,-91.8431,74.94,4.5,mb,,174,0.145,1.1,us,us70005hl7,2019-09-18T15:01:47.775Z,12km S of Genova, Guatemala,earthquake,9.5,9.6,0.05,122,reviewed,us,us                                            ",
"2019-09-17T18:45:27.359Z,4.1195,125.9466,137.95,4.6,mb,,84,2.953,0.43,us,us70005hkt,2019-09-18T16:11:09.040Z,151km SSE of Sarangani, Philippines,earthquake,5.5,8.6,0.068,69,reviewed,us,us                                    ",
"2019-09-17T16:03:20.766Z,-3.1766,147.0152,10,5.2,mww,,77,1.179,0.86,us,us70005hi4,2019-09-25T14:50:21.040Z,130km SSW of Lorengau, Papua New Guinea,earthquake,4.9,1.9,0.065,23,reviewed,us,us                                  ",
"2019-09-17T15:51:18.312Z,-16.5176,-173.881,42.13,4.6,mb,,112,3.293,0.49,us,us70005hi2,2019-09-25T14:42:19.040Z,64km SSW of Hihifo, Tonga,earthquake,6,9.1,0.079,47,reviewed,us,us                                              ",
"2019-09-17T14:37:58.401Z,0.2797,122.2413,148.35,4.5,mb,,92,1.415,0.75,us,us70005hhb,2019-09-25T14:31:50.040Z,29km SSW of Tilamuta, Indonesia,earthquake,8.4,6.9,0.132,17,reviewed,us,us                                        ",
"2019-09-17T14:10:19.899Z,-11.0514,166.4169,153.18,5.1,mb,,67,4.435,0.58,us,us70005hh0,2019-09-25T14:21:55.040Z,73km ESE of Lata, Solomon Islands,earthquake,8.6,6.9,0.03,361,reviewed,us,us                                    ",
"2019-09-17T13:51:33.118Z,36.3387,-33.9207,10,5.4,mww,,29,6.863,0.5,us,us70005hgt,2019-09-25T14:22:39.419Z,Azores Islands region,earthquake,9.4,1.8,0.041,57,reviewed,us,us                                                     ",
"2019-09-17T13:17:34.145Z,33.1823,140.7818,51.88,4.5,mb,,155,0.814,0.73,us,us70005l48,2019-09-25T14:18:23.040Z,92km E of Hachijo-jima, Japan,earthquake,8.5,9.3,0.163,11,reviewed,us,us                                         ",
"2019-09-17T10:30:07.375Z,0.415,125.5406,63.23,4.7,mb,,46,1.86,1.2,us,us70005hfq,2019-09-17T13:39:30.040Z,120km SSE of Bitung, Indonesia,earthquake,5.7,8.8,0.092,36,reviewed,us,us                                             ",
"2019-09-17T09:17:48.141Z,-20.7095,-67.366,191.02,4.5,mb,,46,1.769,1.22,us,us70005hf0,2019-09-17T09:46:51.040Z,62km WSW of Uyuni, Bolivia,earthquake,7.6,7.2,0.045,146,reviewed,us,us                                           ",
"2019-09-17T08:25:53.233Z,-25.2557,-179.1224,398.89,4.9,mb,,74,4.113,1.18,us,us70005heq,2019-09-17T09:06:00.040Z,South of the Fiji Islands,earthquake,12.9,5.7,0.033,287,reviewed,us,us                                         ",
"2019-09-17T01:09:55.614Z,61.7202,-150.8856,69.9,5.2,mww,,,,0.67,ak,ak019by0dpof,2019-09-27T01:20:04.954Z,42km W of Willow, Alaska,earthquake,,0.1,,,reviewed,ak,ak                                                             ",
"2019-09-16T23:45:28.916Z,-17.1609,-176.0498,205.04,4.7,mb,,153,3.467,0.64,us,us70005hc9,2019-09-17T00:04:37.040Z,274km NW of Neiafu, Tonga,earthquake,14.1,10.3,0.126,19,reviewed,us,us                                        ",
"2019-09-16T23:45:15.410Z,-16.4441,-174.316,192.68,4.9,mb,,78,3.515,0.87,us,us70005hcf,2019-09-17T01:12:32.040Z,81km SW of Hihifo, Tonga,earthquake,9.2,8.9,0.122,21,reviewed,us,us                                             ",
"2019-09-16T18:39:44.026Z,-19.0485,-69.2405,92.09,4.5,mwr,,118,0.618,0.9,us,us70005h7a,2019-09-24T17:46:19.040Z,99km SSE of Putre, Chile,earthquake,5.5,7.8,,,reviewed,us,guc                                                   ",
"2019-09-16T16:55:41.986Z,27.6148,56.3437,10,4.5,mb,,105,2.661,0.93,us,us70005h57,2019-09-24T19:48:49.040Z,47km N of Bandar 'Abbas, Iran,earthquake,7.4,1.9,0.094,33,reviewed,us,us                                             ",
"2019-09-16T16:14:11.435Z,31.7794,103.412,10,4.7,mb,,53,4.172,0.61,us,us70005h3s,2019-09-24T19:24:34.572Z,17km S of Se'ergu, China,earthquake,9.5,1.9,0.138,23,reviewed,us,us                                                   ",
"2019-09-16T16:04:57.969Z,-21.9074,-68.6976,116.51,4.5,mb,,51,0.517,0.81,us,us70005h3b,2019-09-24T19:21:16.040Z,66km NNE of Calama, Chile,earthquake,5.5,5.3,0.081,46,reviewed,us,us                                            ",
"2019-09-16T15:22:29.282Z,-16.275,-173.4717,37.49,4.5,mb,,110,2.865,0.21,us,us60005mvk,2019-09-24T19:03:45.040Z,46km SE of Hihifo, Tonga,earthquake,10.5,6.7,0.163,11,reviewed,us,us                                            ",
"2019-09-16T14:40:49.122Z,-17.9747,-178.432,582.8,4.5,mb,,120,7.569,0.25,us,us60005mvj,2019-09-24T18:37:59.040Z,289km SE of Lambasa, Fiji,earthquake,17,12.9,0.131,17,reviewed,us,us                                            ",
"2019-09-16T14:33:25.773Z,29.691,80.7419,10,4.5,mb,,165,5.597,0.47,us,us70005h21,2019-09-24T18:28:06.899Z,26km SE of Darchula, Nepal,earthquake,8.9,1.8,0.151,13,reviewed,us,us                                                 ",
"2019-09-16T12:56:56.664Z,31.3479,51.3433,10,4.5,mb,,139,3.598,0.5,us,us70005h11,2019-09-17T06:27:24.040Z,22km WSW of Semirom, Iran,earthquake,6.8,1.9,0.132,17,reviewed,us,us                                                  ",
"2019-09-16T12:48:41.704Z,38.5542,100.2469,18.52,5.1,mww,,30,10.313,0.75,us,us70005h0y,2019-09-17T12:50:29.920Z,45km SSW of Zhangye, China,earthquake,7.9,3.3,0.078,16,reviewed,us,us                                           ",
"2019-09-16T12:43:59.828Z,39.4512,142.6479,47.7,4.7,mb,,135,1.805,0.85,us,us70005h0t,2019-09-16T13:33:12.040Z,60km E of Yamada, Japan,earthquake,3.5,7.8,0.04,188,reviewed,us,us                                                ",
"2019-09-16T10:34:35.155Z,-1.045,128.5587,10,4.8,mb,,82,2.162,1.04,us,us70005gzh,2019-09-16T12:01:47.040Z,104km ENE of Laiwui, Indonesia,earthquake,6.2,1.9,0.09,38,reviewed,us,us                                              ",
"2019-09-16T06:33:15.943Z,-17.6461,-178.6753,540.26,4.6,mb,,55,3.12,0.98,us,us70005gwz,2019-09-16T07:04:00.040Z,247km SE of Lambasa, Fiji,earthquake,8.1,8,0.027,402,reviewed,us,us                                             ",
"2019-09-16T05:54:18.650Z,-3.7977,-76.2156,109.54,4.6,mb,,109,3.312,0.84,us,us70005gws,2019-09-16T06:28:19.040Z,126km NNE of Barranca, Peru,earthquake,6.8,8.3,0.068,65,reviewed,us,us                                          ",
"2019-09-16T00:29:32.777Z,25.9352,143.0512,10,5.2,mww,,29,1.392,1.05,us,us70005gul,2019-09-16T14:54:19.040Z,151km SSE of Chichi-shima, Japan,earthquake,7.3,1.8,0.071,19,reviewed,us,us                                         ",
"2019-09-15T22:38:15.967Z,56.1598,162.7377,35,4.5,mb,,59,3.94,0.52,us,us70005gtq,2019-09-15T23:46:16.040Z,17km ESE of Ust'-Kamchatsk Staryy, Russia,earthquake,12.4,1.9,0.038,204,reviewed,us,us                                ",
"2019-09-15T21:44:07.323Z,39.6602,76.8525,10,4.5,mb,,185,2.478,0.74,us,us70005gsv,2019-09-15T22:03:53.040Z,62km E of Arzak, China,earthquake,8.8,2,0.204,7,reviewed,us,us                                                       ",
"2019-09-15T18:20:06.479Z,51.744,177.9382,154.13,4.5,mb,,181,0.926,0.79,us,us70005gqr,2019-09-27T20:36:48.617Z,45km WSW of Little Sitkin Island, Alaska,earthquake,14.8,16.7,0.044,153,reviewed,us,us                           ",
"2019-09-15T16:34:58.872Z,42.4801,84.2853,34.6,4.5,mb,,109,4.352,0.93,us,us60005m8x,2019-09-23T18:57:31.040Z,139km NE of Kuqa, China,earthquake,9.2,2.8,0.108,25,reviewed,us,us                                                 ",
"2019-09-15T16:27:10.070Z,41.2468,141.9598,56.65,4.7,mb,,133,0.817,0.55,us,us70005gpu,2019-09-23T17:46:01.099Z,62km E of Mutsu, Japan,earthquake,7,7.3,0.057,93,reviewed,us,us                                                  ",
"2019-09-15T16:13:08.310Z,42.2472,84.4744,35,4.5,mb,,82,4.507,1.09,us,us70005h1u,2019-09-23T17:29:56.040Z,139km ENE of Kuqa, China,earthquake,7.5,2,0.102,28,reviewed,us,us                                                     ",
"2019-09-15T16:02:55.549Z,-19.5641,-173.1005,10,4.5,mb,,152,3.035,0.76,us,us60005m9a,2019-09-23T17:17:06.040Z,133km E of Pangai, Tonga,earthquake,12.5,2,0.156,15,reviewed,us,us                                                ",
"2019-09-15T14:03:08.081Z,-17.8601,179.5163,644.67,4.5,mb,,89,1.399,0.55,us,us60005m99,2019-09-23T16:49:32.040Z,118km ENE of Suva, Fiji,earthquake,13.7,11.4,0.131,17,reviewed,us,us                                            ",
"2019-09-15T13:53:18.412Z,-60.6472,-25.1453,10,4.5,mb,,180,14.137,0.84,us,us70005gp1,2019-09-23T16:39:29.040Z,195km SSE of Bristol Island, South Sandwich Islands,earthquake,17,2,0.1,29,reviewed,us,us                         ",
"2019-09-15T13:26:27.353Z,-21.9762,169.2651,10,4.7,mb,,95,1.799,0.92,us,us70005gnr,2019-09-23T16:36:37.040Z,150km ESE of Tadine, New Caledonia,earthquake,8.8,1.7,0.104,28,reviewed,us,us                                       ",
"2019-09-15T11:50:33.594Z,15.1239,-93.9986,66.61,4.8,mb,,161,2.13,0.96,us,us70005gn6,2019-09-15T12:13:14.040Z,96km SSW of Tres Picos, Mexico,earthquake,8.8,9.4,0.111,25,reviewed,us,us                                         ",
"2019-09-15T11:43:42.901Z,-15.166,-173.8171,91.85,4.9,mb,,88,4.25,0.93,us,us70005gn5,2019-09-15T12:04:19.040Z,87km N of Hihifo, Tonga,earthquake,10.6,7.7,0.086,42,reviewed,us,us                                               ",
"2019-09-15T06:59:17.988Z,13.6911,-91.4156,35,5.2,mww,,83,0.871,1.35,us,us70005glk,2019-09-16T14:53:52.040Z,57km SSW of Nueva Concepcion, Guatemala,earthquake,6.9,1.9,0.068,21,reviewed,us,us                                  ",
"2019-09-15T05:49:49.808Z,-30.4305,-177.7498,35,4.6,mb,,180,1.191,0.66,us,us70005gl7,2019-09-15T06:45:52.040Z,129km S of Raoul Island, New Zealand,earthquake,5.6,2,0.117,22,reviewed,us,us                                     ",
"2019-09-15T03:02:40.185Z,39.3139,141.9768,45.38,4.7,mb,,134,1.631,0.44,us,us70005gk2,2019-09-15T03:29:44.040Z,8km SE of Otsuchi, Japan,earthquake,8.8,7.6,0.1,30,reviewed,us,us                                                ",
"2019-09-15T02:06:51.924Z,35.0554,23.0568,51.33,4.5,mb,,175,1.519,0.87,us,us60005m91,2019-09-24T22:59:16.040Z,60km WSW of Palaiochora, Greece,earthquake,8.7,8.1,0.171,10,reviewed,us,us                                        ",
"2019-09-14T21:10:52.737Z,54.5263,-35.1239,10,5,mb,,70,9.637,1.2,us,us70005gh4,2019-09-14T21:29:19.040Z,Reykjanes Ridge,earthquake,9.4,1.9,0.025,493,reviewed,us,us                                                             ",
"2019-09-14T16:42:07.494Z,-30.2678,-177.858,10,5,mb,,75,1.021,1.19,us,us70005ge6,2019-09-20T17:55:37.040Z,111km S of Raoul Island, New Zealand,earthquake,10.2,1.7,0.069,67,reviewed,us,us                                      ",
"2019-09-14T16:21:27.604Z,-0.9809,128.5368,4.45,5.8,mww,,37,2.097,0.85,us,us70005ge3,2019-09-20T17:11:19.271Z,104km ENE of Laiwui, Indonesia,earthquake,6.3,2.2,0.058,29,reviewed,us,us                                         ",
"2019-09-14T14:40:52.768Z,-33.9679,-73.2775,10,4.6,mb,,151,1.663,0.71,us,us70005gde,2019-09-19T18:25:19.040Z,158km WSW of San Antonio, Chile,earthquake,3.6,1.9,0.083,46,reviewed,us,us                                         ",
"2019-09-14T13:25:54.998Z,53.9769,-165.962,77.22,5.4,mww,,49,0.114,0.81,us,us70005gcr,2019-09-27T13:36:03.248Z,21km SW of Akutan, Alaska,earthquake,7.2,2.7,0.036,74,reviewed,us,us                                             ",
"2019-09-14T12:47:14.572Z,-37.3285,-17.209,10,5.2,mb,,71,35.206,1.18,us,us70005gci,2019-09-14T13:07:10.040Z,Southern Mid-Atlantic Ridge,earthquake,12.4,1.9,0.063,83,reviewed,us,us                                             ",
"2019-09-14T12:22:44.002Z,-33.9673,-73.3703,10,4.9,mb,,96,1.727,1,us,us70005gc7,2019-09-14T12:58:24.040Z,167km WSW of San Antonio, Chile,earthquake,6.2,1.9,0.043,171,reviewed,us,us                                            ",
"2019-09-14T10:35:11.754Z,12.1142,121.9941,23.94,4.5,mb,,173,7.709,0.65,us,us70005gba,2019-09-14T22:54:47.465Z,4km S of Santa Fe, Philippines,earthquake,12.6,7.5,0.102,28,reviewed,us,us                                       ",
"2019-09-14T06:14:32.507Z,-32.8514,-70.4175,98.74,4.6,mb,,86,0.142,0.55,us,us70005g9x,2019-09-14T06:38:33.040Z,17km E of Los Andes, Chile,earthquake,6.2,6.3,0.136,16,reviewed,us,us                                            ",
"2019-09-14T06:03:13.535Z,40.6824,33.0222,10,4.7,mb,,39,0.643,0.75,us,us70005g9r,2019-09-14T14:41:32.225Z,9km NW of Orta, Turkey,earthquake,2.7,1.9,0.108,26,reviewed,us,us                                                     ",
"2019-09-14T05:15:31.330Z,-31.3791,-68.6302,109.04,5,mww,,42,1.846,1.02,us,us70005g9f,2019-09-14T15:44:47.838Z,11km WNW of Albardon, Argentina,earthquake,5.3,4.7,0.062,25,reviewed,us,us                                       ",
"2019-09-14T03:42:05.552Z,-0.3668,132.4292,10,5.1,mb,,97,2.541,0.78,us,us70005g8n,2019-09-14T03:59:51.040Z,143km ENE of Sorong, Indonesia,earthquake,9.2,1.9,0.083,47,reviewed,us,us                                            ",
"2019-09-14T03:11:39.746Z,13.7528,145.0533,124.34,4.5,mb,,121,0.242,1,us,us70005gsn,2019-09-15T21:42:49.533Z,29km NE of Yigo Village, Guam,earthquake,6.3,4.5,0.081,44,reviewed,us,us                                           ",
"2019-09-14T02:54:38.481Z,35.6069,140.1903,55,4.6,mb,,119,1.856,1.01,us,us70005gsc,2019-09-18T14:36:32.347Z,5km SSE of Yotsukaido, Japan,earthquake,7,7.9,0.101,29,reviewed,us,us                                               ",
"2019-09-14T02:48:50.421Z,54.6801,-35.1744,10,4.5,mb,,104,8.472,0.7,us,us70005g8f,2019-09-14T03:41:19.040Z,Reykjanes Ridge,earthquake,11.5,1.9,0.068,64,reviewed,us,us                                                          ",
"2019-09-14T02:42:22.665Z,2.7191,127.4632,72.54,4.5,mb,,112,1.936,0.8,us,us60005leg,2019-09-21T01:24:44.040Z,125km NNW of Tobelo, Indonesia,earthquake,11.7,6.3,0.171,10,reviewed,us,us                                         ",
"2019-09-13T22:53:31.360Z,-15.3483,-173.1688,10,5.4,mb,,24,4.831,0.72,us,us70005g6k,2019-09-14T22:55:14.579Z,91km NE of Hihifo, Tonga,earthquake,7.7,1.7,0.022,719,reviewed,us,us                                               ",
"2019-09-13T16:27:19.334Z,14.9256,-61.5452,162.71,4.8,mb,,34,0.378,0.94,us,us70005fy3,2019-09-16T16:01:38.058Z,39km SSW of Pointe Michel, Dominica,earthquake,6.9,5.1,0.036,242,reviewed,us,us                                  ",
"2019-09-13T15:33:00.065Z,15.8557,-94.9961,46.25,4.7,mb,,158,2.781,1.01,us,us70005fwl,2019-09-13T17:43:17.040Z,38km S of San Mateo del Mar, Mexico,earthquake,2.6,11,0.044,162,reviewed,us,us                                   ",
"2019-09-13T14:12:30.309Z,43.6724,-28.7621,14.12,5.4,mww,,56,6.393,0.94,us,us70005fuu,2019-09-14T14:14:32.539Z,Northern Mid-Atlantic Ridge,earthquake,9.6,4.1,0.073,18,reviewed,us,us                                           ",
"2019-09-13T11:36:09.641Z,36.5434,70.772,116.93,4.5,mb,,156,1.214,0.6,us,us70005ft8,2019-09-13T11:58:49.040Z,36km S of Jarm, Afghanistan,earthquake,8.6,8.7,0.124,19,reviewed,us,us                                             ",
"2019-09-13T09:18:21.295Z,14.9398,122.1546,24.19,4.7,mb,,58,7.901,0.87,us,us70005fsh,2019-09-13T13:13:09.639Z,12km ESE of Carlagan, Philippines,earthquake,8.3,5.4,0.064,74,reviewed,us,us                                      ",
"2019-09-13T08:28:15.544Z,14.9826,122.2051,32.33,5.2,mww,,55,7.866,0.79,us,us70005fry,2019-09-16T13:48:31.556Z,17km E of Carlagan, Philippines,earthquake,7.7,2.1,0.071,19,reviewed,us,us                                       ",
"2019-09-13T04:29:48.194Z,50.6078,87.2246,10,4.7,mb,,135,3.657,1.14,us,us70005fqu,2019-09-13T05:40:11.089Z,49km NW of Aktash, Russia,earthquake,10.4,1.9,0.055,101,reviewed,us,us                                               ",
"2019-09-13T04:08:05.530Z,50.5696,87.3768,10,5,mb,,37,3.73,0.9,us,us70005fqk,2019-09-13T05:36:31.660Z,39km NW of Aktash, Russia,earthquake,6.3,1.8,0.043,174,reviewed,us,us                                                     ",
"2019-09-13T02:53:25.171Z,-5.8586,148.1227,92.83,4.6,mb,,102,3.65,0.63,us,us70005fpe,2019-09-13T03:11:29.040Z,86km NNE of Finschhafen, Papua New Guinea,earthquake,8.3,7.6,0.119,21,reviewed,us,us                              ",
"2019-09-13T01:47:06.409Z,-11.1061,163.2679,10,4.6,mb,,202,3.663,0.8,us,us60005lcs,2019-09-21T00:36:25.040Z,164km ESE of Kirakira, Solomon Islands,earthquake,13,2,0.206,7,reviewed,us,us                                       ",
"2019-09-12T16:53:18.048Z,-44.4275,-81.5378,10,4.9,mww,,75,6.857,0.72,us,us70005ffr,2019-09-13T15:59:58.040Z,West Chile Rise,earthquake,10.4,1.9,0.078,16,reviewed,us,us                                                        ",
"2019-09-12T15:36:32.763Z,-27.8859,74.1611,10,5.1,mb,,56,24.496,0.74,us,us70005fe6,2019-09-13T15:31:27.040Z,Mid-Indian Ridge,earthquake,11,1.8,0.068,75,reviewed,us,us                                                          ",
"2019-09-12T15:28:45.368Z,1.9112,128.2307,124.18,4.6,mb,,93,1.423,0.77,us,us70005fdy,2019-09-13T15:15:40.040Z,31km NE of Tobelo, Indonesia,earthquake,7.7,3.5,0.066,77,reviewed,us,us                                           ",
"2019-09-12T14:08:53.631Z,-27.8783,74.0691,10,5.1,mb,,50,25.417,0.8,us,us70005fcy,2019-09-15T13:05:50.040Z,Mid-Indian Ridge,earthquake,11.2,1.9,0.064,82,reviewed,us,us                                                         ",
"2019-09-12T14:08:18.325Z,-22.1767,-68.6407,122.18,4.7,mww,,39,0.674,0.68,us,us70005fcv,2019-09-15T13:03:05.040Z,44km NE of Calama, Chile,earthquake,6,5.7,0.073,18,reviewed,us,us                                              ",
"2019-09-12T13:09:12.296Z,-15.4155,-64.8778,585.17,4.7,mb,,49,3.248,0.54,us,us70005fcg,2019-09-12T13:56:47.040Z,64km S of La Santisima Trinidad, Bolivia,earthquake,9.3,6.5,0.081,46,reviewed,us,us                             ",
"2019-09-12T11:59:53.692Z,22.005,144.1069,101.85,4.6,mb,,130,5.361,0.93,us,us70005fbn,2019-09-12T12:25:24.040Z,181km NNW of Farallon de Pajaros, Northern Mariana Islands,earthquake,7.9,7.9,0.072,57,reviewed,us,us            ",
"2019-09-12T09:22:32.534Z,36.6584,70.6855,258.79,4.8,mb,,61,1.897,0.6,us,us70005fas,2019-09-12T21:01:00.539Z,26km SSW of Jarm, Afghanistan,earthquake,7.4,6.5,0.06,87,reviewed,us,us                                            ",
"2019-09-12T08:48:40.270Z,-52.5607,13.2521,10,5,mb,,84,20.46,0.56,us,us70005fai,2019-09-12T09:05:50.040Z,Southwest of Africa,earthquake,9.6,1.6,0.091,39,reviewed,us,us                                                         ",
"2019-09-12T07:07:58.570Z,-32.1988,-179.1981,10,4.7,mb,,158,3.14,0.61,us,us70005f9p,2019-09-12T07:49:28.040Z,89km SSW of L'Esperance Rock, New Zealand,earthquake,15.2,1.9,0.147,14,reviewed,us,us                              ",
"2019-09-12T06:27:55.876Z,-31.9959,-67.2012,120.97,4.5,mb,,54,2.843,1.12,us,us70005f9a,2019-09-12T06:54:16.800Z,91km SW of Chepes, Argentina,earthquake,7.7,8.5,0.052,107,reviewed,us,us                                        ",
"2019-09-12T02:38:40.706Z,-15.4357,-174.8407,278.69,4.5,mb,,65,3.33,1.03,us,us70005f8f,2019-09-12T02:58:24.040Z,130km WNW of Hihifo, Tonga,earthquake,10.1,6.6,0.046,136,reviewed,us,us                                         ",
"2019-09-11T23:30:01.791Z,-20.4985,-178.0225,549.03,4.5,mb,,70,4.611,0.71,us,us70005f79,2019-09-22T05:24:17.040Z,72km ENE of Ndoi Island, Fiji,earthquake,10.3,5.2,0.056,95,reviewed,us,us                                      ",
"2019-09-11T23:11:50.391Z,-25.6972,179.459,519.33,4.9,mb,,24,4.227,0.74,us,us70005f60,2019-09-21T05:14:38.040Z,South of the Fiji Islands,earthquake,10.1,5.5,0.055,103,reviewed,us,us                                           ",
"2019-09-11T20:59:09.802Z,47.1844,152.4364,123.14,5,mb,,92,6.613,0.82,us,us70005f3e,2019-09-14T18:34:08.040Z,Kuril Islands,earthquake,10.7,5.3,0.023,630,reviewed,us,us                                                         ",
"2019-09-11T19:16:40.376Z,-38.2887,-93.0573,10,5.4,mww,,122,12.422,1.11,us,us70005f05,2019-09-14T18:24:29.233Z,West Chile Rise,earthquake,12.1,1.8,0.061,26,reviewed,us,us                                                      ",
"2019-09-11T19:06:57.597Z,16.5746,40.1419,10,5,mb,,58,5.659,0.99,us,us70005ezz,2019-09-14T18:16:16.040Z,129km NE of Massawa, Eritrea,earthquake,9.6,1.9,0.056,100,reviewed,us,us                                                ",
"2019-09-11T17:51:55.238Z,-25.5122,178.2913,611.95,5.5,mww,,25,5.011,0.99,us,us70005exl,2019-09-12T21:42:03.040Z,South of the Fiji Islands,earthquake,10.2,4.9,0.071,19,reviewed,us,us                                          ",
"2019-09-11T17:28:27.220Z,-38.6682,175.8704,158.38,4.6,mb,,104,0.694,0.88,us,us70005eww,2019-09-14T17:09:03.040Z,18km W of Taupo, New Zealand,earthquake,7.5,6.6,0.151,13,reviewed,us,us                                        ",
"2019-09-11T15:40:17.181Z,10.9512,91.8646,24.99,4.6,mb,,115,1.11,0.65,us,us60005l0t,2019-09-19T23:35:40.040Z,124km SW of Port Blair, India,earthquake,7.8,4.8,0.128,21,reviewed,us,us                                           ",
"2019-09-11T15:18:03.350Z,-1.8675,-77.8884,142.67,4.5,mb,,71,1.491,1.04,us,us70005et4,2019-09-19T23:27:06.040Z,19km SSE of Palora, Ecuador,earthquake,7.3,5.8,0.044,149,reviewed,us,us                                          ",
"2019-09-11T14:52:30.304Z,-18.005,-70.0175,99.31,4.8,mb,,144,0.585,0.92,us,us70005esi,2019-09-12T07:06:54.040Z,24km E of Tacna, Peru,earthquake,7.5,3.6,0.102,30,reviewed,us,us                                                 ",
"2019-09-11T11:30:21.526Z,-5.8811,147.5478,113.05,4.8,mb,,64,3.521,0.6,us,us70005eq0,2019-09-11T12:37:35.510Z,87km NNW of Finschhafen, Papua New Guinea,earthquake,8.2,7.3,0.047,139,reviewed,us,us                             ",
"2019-09-11T07:14:38.549Z,36.6955,71.0109,222.18,4.5,mb,,72,0.981,0.66,us,us70005ems,2019-09-11T11:00:48.401Z,24km SE of Jarm, Afghanistan,earthquake,8.6,8.3,0.061,78,reviewed,us,us                                           ",
"2019-09-11T06:57:45.828Z,-40.3259,174.2483,110.88,4.5,mb,,64,0.883,0.99,us,us70005eml,2019-09-11T12:19:36.095Z,66km SSW of Patea, New Zealand,earthquake,5.1,3.5,0.163,11,reviewed,us,us                                       ",
"2019-09-11T00:58:32.135Z,-6.7334,150.3649,10,4.5,mb,,142,3.095,0.59,us,us60005l04,2019-09-19T23:13:00.040Z,106km ESE of Kandrian, Papua New Guinea,earthquake,10.3,1.9,0.128,18,reviewed,us,us                                 ",
"2019-09-10T23:54:56.710Z,14.1685,-92.2555,35,4.8,mb,,93,0.648,1.1,us,us70005eji,2019-09-22T23:00:23.398Z,38km S of Ocos, Guatemala,earthquake,5.9,1.9,0.026,448,reviewed,us,us                                                 ",
"2019-09-10T23:46:06.063Z,4.1016,126.6727,10,4.7,mb,,52,3.379,1.08,us,us70005ejw,2019-09-22T22:53:59.040Z,196km SE of Sarangani, Philippines,earthquake,8.8,1.8,0.086,41,reviewed,us,us                                         ",
"2019-09-10T23:32:23.782Z,4.0301,126.6816,27,5.6,mww,,27,3.212,1.16,us,us70005ej7,2019-09-22T22:43:41.005Z,203km SE of Sarangani, Philippines,earthquake,6.6,1.8,0.056,31,reviewed,us,us                                        ",
"2019-09-10T21:07:53.605Z,-12.821,-14.4123,10,4.9,mb,,71,21.567,0.75,us,us60005l8g,2019-09-21T03:02:26.040Z,Southern Mid-Atlantic Ridge,earthquake,11.7,1.9,0.086,43,reviewed,us,us                                             ",
"2019-09-10T20:32:12.236Z,57.0497,-139.545,9.45,5.7,mww,,67,2.008,1.02,us,us70005eee,2019-09-26T20:42:16.571Z,255km W of Sitka, Alaska,earthquake,6,2.9,0.042,55,reviewed,us,us                                                 ",
"2019-09-10T20:18:44.579Z,16.2305,95.0566,10,4.6,mb,,109,4.132,0.97,us,us70005ekb,2019-09-13T18:37:57.040Z,28km SW of Mawlamyinegyunn, Burma,earthquake,9.3,1.9,0.119,21,reviewed,us,us                                         ",
"2019-09-10T18:46:09.404Z,6.1809,125.5029,53.69,4.6,mb,,93,0.886,0.57,us,us70005ebh,2019-09-13T18:40:07.040Z,16km SW of Kinangan, Philippines,earthquake,6.2,7.2,0.087,42,reviewed,us,us                                        ",
"2019-09-10T17:45:42.283Z,13.6433,120.9958,135.45,4.5,mb,,96,8.765,0.82,us,us70005e9z,2019-09-13T19:42:23.328Z,8km WNW of Ilijan, Philippines,earthquake,9.3,6.7,0.058,91,reviewed,us,us                                        ",
"2019-09-10T17:12:33.310Z,-9.16,113.4244,69.71,4.7,mb,,52,0.993,0.8,us,us70005e98,2019-09-13T19:51:23.376Z,86km SSW of Sumberejo, Indonesia,earthquake,6.5,6.9,0.087,44,reviewed,us,us                                          ",
"2019-09-10T16:22:47.212Z,41.0373,44.1411,6.71,4.7,mb,,42,0.998,0.71,us,us70005e8a,2019-09-23T15:01:24.918Z,15km SW of Tashir, Armenia,earthquake,5.9,5.4,0.051,115,reviewed,us,us                                              ",
"2019-09-10T15:45:52.782Z,-55.9412,-25.8727,10,4.7,mb,,129,6.314,0.9,us,us60005l8f,2019-09-23T14:57:34.040Z,117km NE of Visokoi Island, South Georgia and the South Sandwich Islands,earthquake,9.7,1.9,0.11,25,reviewed,us,us  ",
"2019-09-10T14:16:46.446Z,12.9188,-88.7785,54.06,5,mww,,119,1.576,0.97,us,us70005e4e,2019-09-23T14:36:21.040Z,47km SSW of Puerto El Triunfo, El Salvador,earthquake,4.4,5.6,0.071,19,reviewed,us,us                             ",
"2019-09-10T13:40:58.831Z,23.6561,-44.8836,10,4.8,mb,,83,16.865,0.81,us,us70005e3v,2019-09-23T14:32:04.040Z,Northern Mid-Atlantic Ridge,earthquake,7.5,1.9,0.039,203,reviewed,us,us                                             ",
"2019-09-10T09:53:00.812Z,-58.8379,-16.2865,10,5,mb,,66,14.001,0.6,us,us70005e1r,2019-09-10T10:16:53.040Z,East of the South Sandwich Islands,earthquake,12,1.8,0.082,48,reviewed,us,us                                          ",
"2019-09-10T05:39:24.579Z,6.7042,126.4689,55.52,5.6,mww,,40,0.955,1.41,us,us70005dza,2019-09-13T08:56:52.118Z,23km SE of Bobon, Philippines,earthquake,8,5.3,0.048,41,reviewed,us,us                                            ",
"2019-09-10T04:25:55.631Z,39.5419,-116.5599,9.1,4.6,ml,53,67.17,0.857,0.2275,nn,nn00703188,2019-09-11T04:27:01.615Z,45km E of Austin, Nevada,earthquake,,2.2,0.27,23,reviewed,nn,nn                                             ",
"2019-09-09T21:24:18.838Z,50.4174,-177.172,10,5.4,mww,,78,1.345,0.74,us,us70005dvf,2019-09-28T21:34:30.469Z,165km SE of Amatignak Island, Alaska,earthquake,4.7,1.7,0.03,108,reviewed,us,us                                     ",
"2019-09-09T21:16:15.887Z,12.3356,144.6193,19.73,4.5,mb,,169,1.269,0.36,us,us70005hu9,2019-09-19T22:13:19.040Z,103km S of Merizo Village, Guam,earthquake,15.9,7.8,0.15,13,reviewed,us,us                                       ",
"2019-09-09T18:44:52.072Z,17.723,-47.1452,10,4.6,mb,,69,12.804,1.36,us,us70005dsn,2019-09-18T16:19:53.040Z,Northern Mid-Atlantic Ridge,earthquake,8.3,1.9,0.052,110,reviewed,us,us                                              ",
"2019-09-09T18:05:17.130Z,10.5096,-64.4245,10,5.4,mww,,29,3.159,0.76,us,us70005drn,2019-09-18T16:18:47.423Z,19km WSW of Araya, Venezuela,earthquake,7,1.8,0.047,44,reviewed,us,us                                               ",
"2019-09-09T17:17:07.887Z,13.5027,120.9428,192.32,5,mww,,79,0.596,1.06,us,us70005dqu,2019-09-18T15:20:40.229Z,1km E of Balatero, Philippines,earthquake,8.2,2.8,0.073,18,reviewed,us,us                                         ",
"2019-09-09T16:54:08.344Z,-12.6013,167.1112,209.91,4.5,mb,,72,14.465,0.67,us,us70005hu1,2019-09-18T13:42:49.040Z,149km NNW of Sola, Vanuatu,earthquake,9,7.8,0.072,56,reviewed,us,us                                            ",
"2019-09-09T09:53:30.407Z,-36.3604,-99.2795,18.76,5.5,mww,,182,20.775,1.29,us,us70005dlz,2019-09-10T09:55:07.625Z,Southeast of Easter Island,earthquake,17.1,5.8,0.068,21,reviewed,us,us                                        ",
"2019-09-09T09:37:58.391Z,-19.4904,168.4268,20.93,5.2,mb,,78,3.168,1.01,us,us70005dly,2019-09-09T22:25:58.040Z,88km W of Isangel, Vanuatu,earthquake,7.1,4.4,0.075,58,reviewed,us,us                                            ",
"2019-09-09T09:36:36.837Z,2.4248,126.9065,52.75,4.5,mb,,105,1.705,1.09,us,us70005dlu,2019-09-16T09:02:38.040Z,144km WNW of Tobelo, Indonesia,earthquake,9.2,9.4,0.096,32,reviewed,us,us                                         ",
"2019-09-09T06:40:32.810Z,32.9968,76.1826,35,4.9,mb,,71,2.525,0.55,us,us70005dl7,2019-09-12T09:37:22.649Z,43km E of Bhadarwah, India,earthquake,9.6,2,0.045,156,reviewed,us,us                                                  ",
"2019-09-09T05:07:47.493Z,20.899,121.6378,54.19,4.7,mb,,76,1.978,0.71,us,us70005dkl,2019-09-09T05:29:42.040Z,24km WNW of Itbayat, Philippines,earthquake,8.4,6.8,0.063,77,reviewed,us,us                                        ",
"2019-09-09T03:54:06.227Z,51.4531,-178.5882,16.86,5.4,mww,,39,0.173,0.91,us,us70005djx,2019-09-28T04:04:11.925Z,42km ENE of Amatignak Island, Alaska,earthquake,5.4,2.8,0.046,46,reviewed,us,us                                 ",
"2019-09-09T02:57:49.082Z,39.3781,15.4884,251.29,4.5,mb,,48,0.664,1.29,us,us70005djt,2019-09-18T22:45:15.040Z,41km WSW of Cetraro, Italy,earthquake,4.9,5.6,0.045,147,reviewed,us,us                                            ",
"2019-09-09T02:57:46.599Z,-11.1898,166.2016,66.15,4.7,mb,,68,4.342,0.74,us,us70005dju,2019-09-18T22:42:18.040Z,66km SE of Lata, Solomon Islands,earthquake,8.2,6.2,0.071,60,reviewed,us,us                                      ",
"2019-09-09T01:26:57.894Z,23.6115,143.9177,26.42,4.9,mb,,59,3.807,0.67,us,us70005djk,2019-09-18T22:28:11.040Z,292km ESE of Iwo Jima, Japan,earthquake,11.5,4.8,0.04,199,reviewed,us,us                                          ",
"2019-09-09T00:59:00.586Z,32.2335,139.9009,133.09,4.5,mb,,190,0.882,0.76,us,us70005djd,2019-09-09T01:19:54.040Z,94km S of Hachijo-jima, Japan,earthquake,10.3,6.3,0.059,84,reviewed,us,us                                       ",
"2019-09-09T00:38:46.263Z,-6.4724,30.7706,25,5.4,mww,,22,5.831,1.21,us,us70005dj8,2019-09-14T23:30:46.448Z,32km WSW of Mpanda, Tanzania,earthquake,4.6,1.8,0.066,22,reviewed,us,us                                              ",
"2019-09-08T21:26:32.405Z,58.4663,-31.6262,10,4.6,mb,,93,7.457,0.84,us,us70005dhr,2019-09-08T23:53:52.040Z,Reykjanes Ridge,earthquake,10.3,1.9,0.074,54,reviewed,us,us                                                          ",
"2019-09-08T20:00:17.776Z,37.4988,21.9211,10,4.5,mb,,48,0.319,0.77,us,us70005dgg,2019-09-11T08:28:41.902Z,22km WNW of Megalopolis, Greece,earthquake,2.2,1.9,0.113,23,reviewed,us,us                                            ",
"2019-09-08T18:10:32.456Z,-6.5371,155.0233,371.68,5.1,mww,,64,3.679,0.7,us,us70005dfx,2019-09-08T20:25:18.383Z,56km WSW of Panguna, Papua New Guinea,earthquake,10.1,6.8,0.071,19,reviewed,us,us                                ",
"2019-09-08T14:43:31.311Z,4.7667,61.8203,10,4.5,mb,,98,11.316,0.59,us,us70005h4l,2019-09-16T20:06:58.040Z,Carlsberg Ridge,earthquake,5.8,1.9,0.156,12,reviewed,us,us                                                            ",
"2019-09-08T13:49:16.791Z,6.1092,125.515,35,5,mww,,56,0.956,1,us,us70005deu,2019-09-16T18:55:10.679Z,15km ENE of Suyan, Philippines,earthquake,4.6,1.9,0.078,16,reviewed,us,us                                                  ",
"2019-09-08T10:53:27.856Z,26.9212,55.6394,10,4.6,mb,,120,2.032,0.51,us,us70005de5,2019-09-08T11:15:19.040Z,62km W of Qeshm, Iran,earthquake,9.3,1.9,0.077,50,reviewed,us,us                                                     ",
"2019-09-08T05:23:55.553Z,29.1924,142.4578,10,4.5,mb,,184,2.102,0.39,us,us70005h48,2019-09-27T08:42:46.040Z,234km N of Chichi-shima, Japan,earthquake,6.7,1.9,0.163,11,reviewed,us,us                                           ",
"2019-09-08T04:34:31.067Z,37.1156,143.2114,10,4.6,mb,,132,2.067,0.46,us,us70005dbx,2019-09-08T04:54:00.040Z,200km E of Namie, Japan,earthquake,7.8,1.9,0.093,35,reviewed,us,us                                                  ",
"2019-09-08T04:01:39.511Z,60.0731,-140.588,15.9,4.5,ml,,,,0.71,ak,ak019bj6a53x,2019-09-09T15:30:21.040Z,75km NW of Yakutat, Alaska,earthquake,,0.2,,,reviewed,ak,ak                                                             ",
"2019-09-08T03:34:20.308Z,-26.0422,68.7441,10,5.2,mww,,77,7.979,0.69,us,us70005dbs,2019-09-09T22:41:46.040Z,Indian Ocean Triple Junction,earthquake,10.7,1.8,0.086,13,reviewed,us,us                                            ",
"2019-09-08T02:36:22.891Z,29.4693,104.6284,10,4.9,mb,,72,8.135,0.59,us,us70005dbp,2019-09-08T03:05:35.040Z,7km SSW of Yanling, China,earthquake,11.8,1.9,0.083,46,reviewed,us,us                                                ",
"2019-09-08T02:34:32.478Z,33.075,76.174,10,4.8,mb,,115,2.498,0.85,us,us70005dbm,2019-09-08T02:56:38.040Z,43km ENE of Bhadarwah, India,earthquake,7.8,1.9,0.066,71,reviewed,us,us                                                ",
"2019-09-07T22:42:14.799Z,29.5278,104.9306,10,5,mww,,18,4.032,0.62,us,us70005dar,2019-09-21T02:08:24.338Z,14km WSW of Neijiang, China,earthquake,6.6,1.8,0.055,32,reviewed,us,us                                                ",
"2019-09-07T20:05:12.498Z,79.4955,4.3505,10,4.6,mb,,52,1.543,0.94,us,us70005d9m,2019-09-18T04:43:09.040Z,281km NW of Longyearbyen, Svalbard and Jan Mayen,earthquake,8,1.9,0.067,67,reviewed,us,us                              ",
"2019-09-07T19:02:50.083Z,-6.3808,-75.6762,10,4.6,mb,,63,2.801,0.87,us,us70005d95,2019-09-18T03:52:40.040Z,55km ENE of Chazuta, Peru,earthquake,6.2,1.9,0.098,31,reviewed,us,us                                                 ",
"2019-09-07T18:50:37.535Z,-58.949,-26.6456,142.72,5.3,mww,,38,15.208,0.89,us,us70005d8v,2019-09-10T16:01:00.387Z,11km NW of Bristol Island, South Sandwich Islands,earthquake,9.1,4.4,0.083,14,reviewed,us,us                   ",
"2019-09-07T18:49:56.799Z,-13.1436,21.5131,10,4.6,mb,,73,6.811,0.67,us,us70005d8x,2019-09-10T15:40:04.040Z,177km WNW of Zambezi, Zambia,earthquake,9.5,1.5,0.102,29,reviewed,us,us                                              ",
"2019-09-07T18:35:42.697Z,-24.281,-179.8124,518.3,4.5,mb,,122,6.802,0.76,us,us70005d8r,2019-09-10T15:24:27.040Z,South of the Fiji Islands,earthquake,15.3,13.2,0.09,39,reviewed,us,us                                           ",
"2019-09-07T14:16:17.131Z,27.8256,142.7482,24.79,4.7,mb,,95,0.882,0.93,us,us70005d79,2019-09-10T17:39:38.040Z,97km NNE of Chichi-shima, Japan,earthquake,5.7,5.1,0.055,108,reviewed,us,us                                       ",
"2019-09-07T09:35:50.975Z,41.5937,142.0583,56.79,5.2,mww,,116,0.923,0.49,us,us70005d5v,2019-09-26T08:09:12.637Z,78km ENE of Mutsu, Japan,earthquake,6,4.7,0.068,21,reviewed,us,us                                               ",
"2019-09-07T05:35:01.315Z,-46.8716,-10.5845,10,5.3,mb,,64,25.145,0.48,us,us70005d4z,2019-09-07T05:52:58.040Z,Southern Mid-Atlantic Ridge,earthquake,11.9,1.9,0.075,60,reviewed,us,us                                            ",
"2019-09-07T03:20:04.591Z,47.5949,154.3595,28.42,4.7,mb,,134,5.918,0.76,us,us70005d45,2019-09-07T03:35:58.040Z,Kuril Islands,earthquake,9.7,5.1,0.05,123,reviewed,us,us                                                         ",
"2019-09-07T02:58:39.461Z,-15.5334,-174.9738,10,4.7,mb,,117,3.488,0.92,us,us70005d3w,2019-09-14T01:19:05.040Z,139km WNW of Hihifo, Tonga,earthquake,13.1,1.9,0.062,78,reviewed,us,us                                            ",
"2019-09-06T23:32:28.501Z,64.5991,-152.3668,11,4.6,ml,,,,0.89,ak,ak019bg6payj,2019-09-20T01:01:15.557Z,66km SSW of Tanana, Alaska,earthquake,,0.3,,,reviewed,ak,ak                                                              ",
"2019-09-06T23:28:24.535Z,-0.0178,130.7625,10,4.7,mb,,172,3.242,0.56,us,us70005fwg,2019-09-13T23:34:43.040Z,110km NNW of Sorong, Indonesia,earthquake,9.5,2,0.166,11,reviewed,us,us                                             ",
"2019-09-06T21:14:26.318Z,-0.1307,130.5616,10,5.1,mww,,26,3.243,0.75,us,us70005d1h,2019-09-06T22:14:39.040Z,113km NW of Sorong, Indonesia,earthquake,7.2,1.7,0.068,21,reviewed,us,us                                            ",
"2019-09-06T18:35:12.377Z,18.9983,145.5123,230.45,4.5,mb,,84,3.746,0.8,us,us70005cy0,2019-09-07T14:29:55.040Z,30km NNW of Agrihan, Northern Mariana Islands,earthquake,8.7,6.8,0.045,157,reviewed,us,us                         ",
"2019-09-06T17:25:39.362Z,-31.0366,-177.8595,31.22,5,mb,,95,1.786,1.08,us,us70005cxg,2019-09-07T14:20:31.040Z,108km ENE of L'Esperance Rock, New Zealand,earthquake,5.8,4.5,0.093,41,reviewed,us,us                             ",
"2019-09-06T15:27:56.449Z,-20.1971,169.0722,29.11,5.9,mww,,42,2.841,1.3,us,us70005cu5,2019-09-07T15:30:14.578Z,74km SSW of Isangel, Vanuatu,earthquake,7.6,3.4,0.058,29,reviewed,us,us                                          ",
"2019-09-06T14:41:41.746Z,16.2336,122.4682,57.44,4.5,mb,,129,7.206,0.65,us,us70005fvv,2019-09-29T13:35:11.040Z,55km E of Dinalongan, Philippines,earthquake,11.4,8.3,0.14,15,reviewed,us,us                                     ",
"2019-09-06T13:33:48.654Z,-5.7199,-75.2718,127.25,4.5,mb,,115,3.238,0.66,us,us70005cs1,2019-09-13T07:22:45.040Z,70km SE of Lagunas, Peru,earthquake,9,7.9,0.071,58,reviewed,us,us                                               ",
"2019-09-06T13:28:22.305Z,12.9339,-88.7746,55.98,4.8,mb,,138,1.563,0.92,us,us70005crr,2019-09-10T13:58:01.040Z,45km SSW of Puerto El Triunfo, El Salvador,earthquake,7.1,7,0.041,182,reviewed,us,us                             ",
"2019-09-06T12:02:24.643Z,3.8946,126.4531,73.62,4.8,mb,,105,3.233,0.81,us,us70005cr0,2019-09-06T12:41:09.040Z,199km SSE of Sarangani, Philippines,earthquake,5.7,8.6,0.079,49,reviewed,us,us                                    ",
"2019-09-06T10:37:55.213Z,-18.0516,167.5929,10,4.9,mb,,102,2.616,0.81,us,us70005cqu,2019-09-06T11:00:36.040Z,84km WSW of Port-Vila, Vanuatu,earthquake,8.3,1.9,0.072,61,reviewed,us,us                                          ",
"2019-09-06T10:32:59.548Z,13.8207,120.5642,139.07,4.9,mb,,59,8.826,0.86,us,us70005cqr,2019-09-13T08:49:43.713Z,7km W of Calatagan, Philippines,earthquake,9.3,7.5,0.043,169,reviewed,us,us                                      ",
"2019-09-06T10:09:48.760Z,21.184,94.6497,98.86,4.8,mb,,50,1.748,0.96,us,us70005cqm,2019-09-06T10:29:42.040Z,37km NNW of Chauk, Burma,earthquake,7.2,6.9,0.058,92,reviewed,us,us                                                 ",
"2019-09-06T07:43:49.367Z,12.2878,47.2806,10,4.5,mb,,118,4.404,0.82,us,us70005fvk,2019-09-29T08:38:41.040Z,149km SSE of Ahwar, Yemen,earthquake,6.4,1.9,0.135,16,reviewed,us,us                                                 ",
"2019-09-06T07:25:36.304Z,28.6904,104.7746,10,4.6,mb,,114,4.407,0.85,us,us70005cng,2019-09-29T08:09:21.040Z,16km ESE of Yibin, China,earthquake,8.6,1.9,0.101,29,reviewed,us,us                                                 ",
"2019-09-06T06:15:35.261Z,1.0546,30.315,10,4.6,mb,,74,1.699,0.65,us,us70005cqd,2019-09-29T07:47:24.322Z,18km W of Ntoroko, Uganda,earthquake,9.2,1.9,0.095,33,reviewed,us,us                                                    ",
"2019-09-06T04:26:05.857Z,16.2069,122.3693,52.44,4.7,mb,,67,7.219,0.64,us,us70005cmh,2019-09-06T04:49:33.040Z,44km E of Dinalongan, Philippines,earthquake,12.5,9.1,0.085,42,reviewed,us,us                                     ",
"2019-09-06T01:17:30.193Z,-4.1185,152.8176,48,4.7,mb,,117,0.656,1.24,us,us70005clz,2019-09-06T01:46:31.040Z,45km NNW of Taron, Papua New Guinea,earthquake,6.9,8,0.096,33,reviewed,us,us                                        ",
"2019-09-05T23:04:57.996Z,-1.9889,27.1195,10,4.7,mb,,77,3.871,1,us,us70005clm,2019-09-06T02:31:13.040Z,167km NE of Kindu, Democratic Republic of the Congo,earthquake,8.9,1.9,0.074,56,reviewed,us,us                           ",
"2019-09-05T20:43:34.889Z,-2.8823,138.7497,35,4.9,mb,,49,1.986,0.84,us,us70005cjq,2019-09-16T18:36:41.040Z,205km W of Abepura, Indonesia,earthquake,3.5,2,0.05,125,reviewed,us,us                                               ",
"2019-09-05T19:29:57.625Z,26.057,142.716,10,4.5,mb,,157,1.138,0.69,us,us70005gyj,2019-09-16T16:51:52.040Z,124km SSE of Chichi-shima, Japan,earthquake,6.9,1.9,0.102,28,reviewed,us,us                                           ",
"2019-09-05T18:50:05.851Z,-1.9391,26.9571,10,5,mb,,104,4.006,0.84,us,us70005ch2,2019-09-16T15:55:40.876Z,158km NE of Kindu, Democratic Republic of the Congo,earthquake,6.4,1.9,0.078,53,reviewed,us,us                         ",
"2019-09-05T18:19:25.141Z,-23.8908,-66.7525,206.26,4.5,mb,,129,1.609,0.66,us,us70005cgf,2019-09-16T15:53:28.040Z,57km NW of San Antonio de los Cobres, Argentina,earthquake,9.7,9.8,0.221,6,reviewed,us,us                      ",
"2019-09-05T17:29:44.671Z,-26.4773,-177.4188,115.64,4.5,mb,,134,9.649,1.14,us,us70005gyi,2019-09-16T16:34:12.040Z,South of the Fiji Islands,earthquake,14,7.9,0.115,22,reviewed,us,us                                           ",
"2019-09-05T17:09:34.447Z,12.6952,-88.7892,35,4.5,mb,,179,1.725,1.25,us,us70005gyt,2019-09-16T18:29:58.040Z,70km SSW of Puerto El Triunfo, El Salvador,earthquake,7.8,2,0.145,14,reviewed,us,us                                 ",
"2019-09-05T16:06:04.039Z,-57.5866,-66.2696,10,5.1,mww,,51,2.767,0.88,us,us70005ccy,2019-09-06T19:14:19.596Z,Drake Passage,earthquake,4.1,1.7,0.103,9,reviewed,us,us                                                            ",
"2019-09-05T15:47:39.784Z,52.8942,-31.5777,10,4.6,mb,,94,16.765,1.15,us,us70005cdy,2019-09-06T18:56:07.040Z,Northern Mid-Atlantic Ridge,earthquake,12,1.9,0.072,65,reviewed,us,us                                               ",
"2019-09-05T15:37:27.414Z,-44.5308,-80.7149,10,4.9,mww,,135,5.294,1.27,us,us70005cch,2019-09-06T18:53:27.040Z,Off the coast of Aisen, Chile,earthquake,11,1.9,0.103,9,reviewed,us,us                                            ",
"2019-09-05T15:02:45.260Z,43.7127,-127.827,10,5.9,mww,,54,2.684,0.86,us,us70005cba,2019-09-27T15:12:53.962Z,284km WNW of Bandon, Oregon,earthquake,7.6,1.8,0.028,122,reviewed,us,us                                             ",
"2019-09-05T13:58:34.502Z,14.722,116.1689,10.97,5.3,mww,,47,7.415,0.87,us,us70005cag,2019-09-05T15:31:03.040Z,South China Sea,earthquake,6.3,4.3,0.073,18,reviewed,us,us                                                        ",
"2019-09-05T13:52:51.891Z,-9.2681,-78.9295,59.23,4.6,mb,,147,3.393,0.84,us,us70005cad,2019-09-05T22:41:15.569Z,43km WSW of Chimbote, Peru,earthquake,9.9,8.7,0.066,69,reviewed,us,us                                            ",
"2019-09-05T11:56:19.555Z,-6.3812,103.6143,35,5.1,mb,,93,2.111,0.76,us,us70005c9s,2019-09-05T12:12:31.040Z,125km SSW of Biha, Indonesia,earthquake,6.3,1.9,0.104,30,reviewed,us,us                                              ",
"2019-09-05T11:52:06.742Z,52.6351,-31.8648,10,5.5,mww,,38,11.285,1.13,us,us70005c9r,2019-09-06T16:48:20.040Z,Northern Mid-Atlantic Ridge,earthquake,9,1.8,0.05,38,reviewed,us,us                                                ",
"2019-09-05T11:09:01.939Z,-17.5818,-69.5101,173.83,4.8,mb,,82,0.029,0.79,us,us70005c9b,2019-09-06T13:45:26.040Z,56km ESE of Tarata, Peru,earthquake,8.1,5.7,0.167,11,reviewed,us,us                                             ",
"2019-09-05T11:01:34.135Z,47.2266,155.7557,34.84,4.8,mb,,135,6.023,0.86,us,us70005c99,2019-09-05T11:18:16.040Z,East of the Kuril Islands,earthquake,8.9,2,0.032,297,reviewed,us,us                                              ",
"2019-09-05T09:12:20.620Z,-2.5119,68.5123,10,5.6,mww,,30,5.384,1.39,us,us70005c8l,2019-09-06T16:45:32.040Z,Carlsberg Ridge,earthquake,8.4,1.7,0.066,22,reviewed,us,us                                                           ",
"2019-09-05T07:32:35.306Z,-17.8643,168.3279,10,5.1,mb,,156,2.634,0.69,us,us70005c87,2019-09-29T07:14:45.206Z,14km S of Port-Vila, Vanuatu,earthquake,9.8,1.9,0.104,30,reviewed,us,us                                            ",
"2019-09-05T06:14:38.610Z,72.6327,2.891,10,4.5,mb,,71,6.508,0.69,us,us70005c7v,2019-09-05T06:58:26.040Z,Norwegian Sea,earthquake,7.1,1.9,0.086,39,reviewed,us,us                                                                ",
"2019-09-05T05:41:31.302Z,-36.0836,-73.8289,10,5.1,mww,,117,0.839,0.51,us,us70005c7g,2019-09-25T08:20:55.129Z,94km NW of Talcahuano, Chile,earthquake,5.4,1.8,0.071,19,reviewed,us,us                                           ",
"2019-09-05T03:23:24.700Z,46.4031,152.8844,10,5,mb,,144,6.987,0.71,us,us70005c6w,2019-09-05T03:35:19.040Z,Kuril Islands,earthquake,10.2,2,0.095,36,reviewed,us,us                                                               ",
"2019-09-05T00:59:20.880Z,27.8342,142.7543,10,4.6,mb,,147,0.893,0.86,us,us70005c6k,2019-09-18T03:29:32.040Z,98km NNE of Chichi-shima, Japan,earthquake,5.9,1.8,0.125,19,reviewed,us,us                                          ",
"2019-09-05T00:16:35.275Z,-17.3101,-172.8145,10,4.6,mb,,108,3.258,0.78,us,us70005gy4,2019-09-18T03:13:29.040Z,180km SSE of Hihifo, Tonga,earthquake,10.4,1.9,0.151,13,reviewed,us,us                                            ",
"2019-09-04T22:18:16.352Z,26.157,143.1454,10,4.5,mb,,155,1.27,0.81,us,us70005eut,2019-09-18T02:34:32.040Z,138km SE of Chichi-shima, Japan,earthquake,9.5,1.9,0.14,15,reviewed,us,us                                             ",
"2019-09-04T21:13:23.908Z,-24.3694,-67.1094,162.04,4.9,mwr,,36,1.718,0.89,us,us70005c4g,2019-09-04T21:32:59.040Z,81km WSW of San Antonio de los Cobres, Argentina,earthquake,7.7,7.2,,,reviewed,us,guc                          ",
"2019-09-04T20:49:10.896Z,-12.4022,85.2191,10,4.5,mb,,60,17.645,0.37,us,us70005eup,2019-09-13T18:53:07.040Z,South Indian Ocean,earthquake,14.9,1.9,0.145,14,reviewed,us,us                                                      ",
"2019-09-04T20:07:15.278Z,0.233,126.2728,49.06,4.8,mb,,36,1.217,1.16,us,us70005c3v,2019-09-11T18:45:25.040Z,136km WSW of Kota Ternate, Indonesia,earthquake,6.6,8,0.084,44,reviewed,us,us                                       ",
"2019-09-04T19:32:22.759Z,-18.1602,-174.8576,245.84,4.6,mb,,90,4.763,0.76,us,us70005eul,2019-09-12T22:14:40.040Z,107km WNW of Neiafu, Tonga,earthquake,10.8,7.6,0.083,43,reviewed,us,us                                         ",
"2019-09-04T19:27:41.185Z,-20.2131,-178.4763,592.69,4.7,mb,,46,4.1,1.24,us,us70005c39,2019-09-11T18:42:51.040Z,53km NNE of Ndoi Island, Fiji,earthquake,8.1,6.2,0.03,327,reviewed,us,us                                         ",
"2019-09-04T18:09:44.217Z,0.2944,126.1741,35,5,mww,,34,1.283,1.01,us,us70005c1i,2019-09-13T19:57:04.040Z,143km WSW of Kota Ternate, Indonesia,earthquake,2.8,1.9,0.069,20,reviewed,us,us                                        ",
"2019-09-04T18:06:16.635Z,-9.3884,107.9787,10,4.6,mb,,137,2.574,1.14,us,us70005c1f,2019-09-11T18:36:15.040Z,178km S of Sindangsari, Indonesia,earthquake,9.3,1.9,0.105,27,reviewed,us,us                                        ",
"2019-09-04T16:18:14.480Z,22.1564,144.6013,35,4.6,mb,,159,5.386,1.19,us,us70005eub,2019-09-12T00:56:48.040Z,181km N of Farallon de Pajaros, Northern Mariana Islands,earthquake,13.3,2,0.114,23,reviewed,us,us                  ",
"2019-09-04T16:02:54.974Z,27.8703,142.5331,14.68,4.9,mww,,108,0.831,0.78,us,us70005bzg,2019-09-12T00:50:49.040Z,92km NNE of Chichi-shima, Japan,earthquake,5.2,4.6,0.071,19,reviewed,us,us                                      ",
"2019-09-04T15:58:28.570Z,-6.2189,130.4754,131.85,4.5,mb,,55,3.724,1.04,us,us70005bzc,2019-09-12T00:49:27.040Z,212km NNW of Saumlaki, Indonesia,earthquake,6.3,8.4,0.121,20,reviewed,us,us                                      ",
"2019-09-04T13:37:47.143Z,2.2881,126.8118,47.51,5,mww,,67,1.605,0.65,us,us70005bxj,2019-09-29T06:53:56.040Z,146km WNW of Tobelo, Indonesia,earthquake,7.8,6,0.073,18,reviewed,us,us                                             ",
"2019-09-04T09:48:22.012Z,-18.9212,-176.3017,10,5.8,mww,,71,5.488,0.59,us,us70005bwn,2019-09-21T13:06:40.933Z,226km WNW of Pangai, Tonga,earthquake,7.1,1.7,0.068,21,reviewed,us,us                                             ",
"2019-09-04T09:13:43.127Z,-36.6058,179.0017,35,4.9,mb,,141,1.104,0.86,us,us70005bwe,2019-09-21T08:30:19.819Z,223km NE of Opotiki, New Zealand,earthquake,5.7,1.9,0.123,21,reviewed,us,us                                        ",
"2019-09-04T07:02:52.759Z,-38.7522,175.9424,10,5.1,mb,,70,0.595,1.39,us,us70005btz,2019-09-04T09:03:35.564Z,14km WSW of Taupo, New Zealand,earthquake,3.9,1.9,0.131,19,reviewed,us,us                                           ",
"2019-09-04T02:20:08.824Z,-17.8075,-173.1015,10,4.7,mb,,208,3.266,1.38,us,us70005eu0,2019-09-12T00:45:49.040Z,131km NE of Neiafu, Tonga,earthquake,10,2,0.159,12,reviewed,us,us                                                 ",
"2019-09-04T01:53:33.454Z,-60.2492,-26.2999,10,4.6,mb,,100,14.767,0.82,us,us70005eu2,2019-09-12T00:34:39.040Z,136km S of Bristol Island, South Sandwich Islands,earthquake,12.8,1.8,0.158,12,reviewed,us,us                     ",
"2019-09-04T01:01:32.884Z,35.1737,27.8965,14.36,4.6,mb,,49,0.707,0.93,us,us70005bq9,2019-09-11T22:41:46.040Z,72km ESE of Karpathos, Greece,earthquake,3.3,4.2,0.065,70,reviewed,us,us                                           ",
"2019-09-03T23:33:09.165Z,9.7096,126.8272,10,4.5,mb,,186,2.899,0.45,us,us70005e7p,2019-09-10T21:55:39.040Z,73km E of General Luna, Philippines,earthquake,15.5,2,0.14,15,reviewed,us,us                                         ",
"2019-09-03T19:18:39.635Z,25.0893,95.0376,87.47,4.5,mb,,66,1.087,0.86,us,us70005blu,2019-09-04T16:12:07.040Z,83km SE of Phek, India,earthquake,7.1,8.5,0.11,24,reviewed,us,us                                                   ",
"2019-09-03T18:47:04.557Z,27.2046,59.6496,42.95,4.9,mb,,78,3.829,1.03,us,us70005bl4,2019-09-04T15:26:53.040Z,102km W of Iranshahr, Iran,earthquake,8.5,5.5,0.053,118,reviewed,us,us                                             ",
"2019-09-03T18:42:37.338Z,39.4106,143.1921,27.81,4.6,mb,,136,2.135,0.85,us,us70005bkw,2019-09-04T15:28:19.040Z,107km E of Yamada, Japan,earthquake,6.1,5.7,0.071,60,reviewed,us,us                                              ",
"2019-09-03T17:39:27.320Z,-8.3391,118.5532,153.89,4.5,mb,,64,3.511,1.34,us,us70005bk5,2019-09-04T14:09:36.040Z,8km S of Sampungu, Indonesia,earthquake,6.2,6.1,0.086,44,reviewed,us,us                                          ",
"2019-09-03T16:39:25.443Z,-56.0713,-144.4304,10,4.5,mb,,85,23.881,1.18,us,us70005e7b,2019-09-10T19:04:42.040Z,Pacific-Antarctic Ridge,earthquake,9.2,1.9,0.191,11,reviewed,us,us                                                ",
"2019-09-03T14:30:56.915Z,36.4155,70.7402,203.83,4.5,mb,,103,1.334,0.9,us,us70005bhm,2019-09-10T18:32:09.040Z,43km N of `Alaqahdari-ye Kiran wa Munjan, Afghanistan,earthquake,6.8,6.2,0.181,9,reviewed,us,us                   ",
"2019-09-03T14:23:19.057Z,-37.9736,176.9582,139.89,4.5,mb,,103,0.641,0.78,us,us70005bhh,2019-09-10T17:22:03.040Z,2km SW of Whakatane, New Zealand,earthquake,7.8,6.2,0.205,10,reviewed,us,us                                    ",
"2019-09-03T12:53:29.172Z,-21.3118,-173.9732,10,5,mb,,117,4.402,0.78,us,us70005bg1,2019-09-03T13:32:25.040Z,101km E of `Ohonua, Tonga,earthquake,15.3,1.9,0.041,193,reviewed,us,us                                              ",
"2019-09-03T12:34:32.036Z,36.498,70.6541,206.61,4.8,mww,,76,1.307,1.06,us,us70005bfw,2019-09-09T06:49:07.603Z,43km SSW of Jarm, Afghanistan,earthquake,8,7.5,0.075,17,reviewed,us,us                                            ",
"2019-09-03T11:52:53.068Z,45.5324,26.2588,115.74,4.6,mb,,30,0.224,1.02,us,us70005bfn,2019-09-03T17:19:35.027Z,13km NNW of Nehoiu, Romania,earthquake,4.6,7.9,0.075,53,reviewed,us,us                                            ",
"2019-09-03T10:10:14.466Z,-8.8838,-76.2029,120.77,4.8,mb,,108,3.147,0.88,us,us70005ben,2019-09-03T16:24:31.451Z,49km NNW of Tingo Maria, Peru,earthquake,6.9,4.6,0.029,371,reviewed,us,us                                       ",
"2019-09-03T08:13:47.129Z,13.9311,144.6332,133.97,4.6,mb,,105,0.409,0.72,us,us70005bdw,2019-09-10T11:34:13.040Z,50km NNW of Dededo Village, Guam,earthquake,12.1,5.8,0.084,42,reviewed,us,us                                    ",
"2019-09-03T07:30:41.615Z,-18.5169,-132.8715,30.09,4.9,mb,,64,15.904,0.4,us,us70005bdi,2019-09-03T08:09:45.040Z,South Pacific Ocean,earthquake,13.2,4.2,0.031,332,reviewed,us,us                                                ",
"2019-09-03T05:39:28.337Z,55.0479,-159.373,16.91,4.7,mb,,102,0.25,1.11,us,us70005bct,2019-09-17T21:09:34.616Z,31km NNE of Chernabura Island, Alaska,earthquake,6.4,5.5,0.032,286,reviewed,us,us                                 ",
"2019-09-02T23:24:03.744Z,-11.951,167.1096,241.29,4.5,mb,,109,3.476,0.69,us,us70005cw7,2019-09-07T04:24:12.040Z,195km SE of Lata, Solomon Islands,earthquake,12.1,7.9,0.1,29,reviewed,us,us                                     ",
"2019-09-02T22:55:06.009Z,-30.3825,-177.7958,37.54,4.6,mb,,184,1.139,0.76,us,us70005cw5,2019-09-10T21:42:20.040Z,124km S of Raoul Island, New Zealand,earthquake,11.7,8,0.137,16,reviewed,us,us                                 ",
"2019-09-02T22:45:48.807Z,23.7766,-45.2169,10,5.9,mww,,40,16.631,0.61,us,us70005b9q,2019-09-10T21:36:46.249Z,Northern Mid-Atlantic Ridge,earthquake,9.8,1.8,0.051,37,reviewed,us,us                                             ",
"2019-09-02T20:53:30.565Z,-24.0769,-67.0467,176.42,4.9,mww,,56,1.527,1.2,us,us70005b8m,2019-09-02T21:18:45.040Z,75km WNW of San Antonio de los Cobres, Argentina,earthquake,5.9,6.3,0.073,18,reviewed,us,us                     ",
"2019-09-02T17:55:39.840Z,12.3301,144.6739,10,4.7,mb,,155,1.265,0.99,us,us70005cvy,2019-09-06T21:44:28.040Z,103km S of Merizo Village, Guam,earthquake,12.4,1.9,0.159,23,reviewed,us,us                                         ",
"2019-09-02T16:59:13.618Z,-32.4015,-178.094,10,4.6,mb,,145,3.149,0.65,us,us70005cvx,2019-09-09T18:58:58.040Z,131km SE of L'Esperance Rock, New Zealand,earthquake,11.5,1.9,0.145,15,reviewed,us,us                              ",
"2019-09-02T16:49:57.936Z,-22.4668,-175.0762,10,4.7,mb,,135,19.787,0.59,us,us70005cvt,2019-09-09T18:42:34.040Z,126km S of `Ohonua, Tonga,earthquake,15.5,1.9,0.087,40,reviewed,us,us                                            ",
"2019-09-02T16:41:21.065Z,51.6991,159.4337,35,4.5,mb,,134,1.41,0.62,us,us70005cvw,2019-09-09T16:48:42.040Z,154km SSE of Vilyuchinsk, Russia,earthquake,9.7,2,0.171,16,reviewed,us,us                                            ",
"2019-09-02T16:35:27.811Z,-14.044,-72.5478,80,5.1,mww,,73,4.598,0.83,us,us70005b70,2019-09-09T16:26:46.244Z,57km SE of Abancay, Peru,earthquake,7.8,1.9,0.071,19,reviewed,us,us                                                 ",
"2019-09-02T13:21:13.058Z,13.5777,120.3069,75.5,4.5,mb,,139,0.803,1.06,us,us70005cvr,2019-09-09T14:50:52.040Z,16km SSE of Looc, Philippines,earthquake,12.1,9,0.181,11,reviewed,us,us                                           ",
"2019-09-02T13:02:45.325Z,80.0866,-0.5952,10,5.2,mb,,36,2.576,1,us,us70005b6f,2019-09-09T14:38:51.040Z,North of Svalbard,earthquake,9,1.9,0.026,502,reviewed,us,us                                                              ",
"2019-09-02T12:04:05.489Z,13.7072,121.6287,36.94,4.7,mb,,100,0.778,0.91,us,us70005cvp,2019-09-24T06:35:46.040Z,21km SSE of Castanas, Philippines,earthquake,6.4,8.5,0.147,14,reviewed,us,us                                     ",
"2019-09-02T09:24:57.938Z,-6.1835,130.2336,166.35,5,mb,,70,2.076,1.01,us,us70005b5q,2019-09-02T09:39:47.040Z,229km NNW of Saumlaki, Indonesia,earthquake,3.2,8.1,0.156,13,reviewed,us,us                                        ",
"2019-09-02T06:48:24.871Z,12.3877,144.6651,10,4.8,mb,,131,1.21,0.58,us,us70005b53,2019-09-02T07:36:06.040Z,97km S of Merizo Village, Guam,earthquake,11,1.9,0.055,102,reviewed,us,us                                            ",
"2019-09-02T06:41:48.770Z,12.3214,144.8473,10,5,mb,,141,1.26,0.99,us,us70005b4r,2019-09-27T06:51:57.273Z,105km S of Inarajan Village, Guam,earthquake,11.7,1.9,0.054,109,reviewed,us,us                                         ",
"2019-09-01T22:41:23.075Z,2.2093,96.6603,37.06,4.9,mb,,160,1.282,0.71,us,us70005b2b,2019-09-01T23:00:44.040Z,43km SE of Sinabang, Indonesia,earthquake,7.8,7.8,0.076,54,reviewed,us,us                                          ",
"2019-09-01T21:32:17.362Z,-18.6071,-70.9799,35,5.1,mww,,139,0.618,1.09,us,us70005b1n,2019-09-02T10:14:22.431Z,72km WSW of Arica, Chile,earthquake,5.9,2,0.071,19,reviewed,us,us                                                 ",
"2019-09-01T17:18:26.575Z,-20.5156,-178.4356,600.06,4.6,mb,,115,4.314,1.14,us,us70005azw,2019-09-01T18:44:11.040Z,31km ENE of Ndoi Island, Fiji,earthquake,12.4,6.9,0.032,296,reviewed,us,us                                    ",
"2019-09-01T16:58:23.938Z,0.3566,126.3246,26.6,4.6,mb,,34,1.12,0.85,us,us70005azn,2019-09-08T19:04:56.040Z,125km WSW of Kota Ternate, Indonesia,earthquake,6.9,5.8,0.117,29,reviewed,us,us                                      ",
"2019-09-01T16:15:40.718Z,-19.3791,-176.0282,10,5.1,mb,,84,5.426,0.4,us,us70005ctf,2019-09-08T17:25:46.040Z,182km WNW of Pangai, Tonga,earthquake,7.5,1.9,0.181,10,reviewed,us,us                                               ",
"2019-09-01T16:10:38.718Z,-19.1828,-176.3318,6.43,5,mb,,147,5.518,0.74,us,us70005ctn,2019-09-08T17:06:10.040Z,218km WNW of Pangai, Tonga,earthquake,13.5,4.5,0.12,22,reviewed,us,us												",
"2019-09-01T15:54:20.411Z,-20.3599,-178.567,591,6.6,mww,,19,4.121,1.01,us,us70005axg,2019-09-17T16:16:23.230Z,34km NNE of Ndoi Island, Fiji,earthquake,3.9,1.9,0.038,65,reviewed,us,us                                          ",
"2019-09-01T15:20:34.277Z,13.7914,145.1563,114.83,4.5,mb,,124,0.344,1.11,us,us70005cte,2019-09-08T15:47:55.040Z,40km NE of Yigo Village, Guam,earthquake,14.2,7.2,0.124,19,reviewed,us,us                                       ",
"2019-09-01T11:57:36.843Z,5.3812,126.7628,98.02,4.8,mb,,107,2.049,0.64,us,us70005avt,2019-09-22T08:58:49.040Z,126km SSE of Pondaguitan, Philippines,earthquake,8.2,7.6,0.085,43,reviewed,us,us                                  ",
"2019-09-01T11:38:09.090Z,2.3695,126.6687,35,4.6,mb,,88,1.733,1.22,us,us70005ct9,2019-09-22T08:58:00.040Z,165km WNW of Tobelo, Indonesia,earthquake,6.3,1.8,0.157,12,reviewed,us,us                                             ",
"2019-09-01T10:34:08.071Z,-6.1457,151.3706,10,4.6,mb,,113,2.096,0.54,us,us70005av2,2019-09-22T08:49:44.040Z,151km ESE of Kimbe, Papua New Guinea,earthquake,6.3,1.9,0.146,14,reviewed,us,us                                     ",
"2019-09-01T08:10:57.476Z,-22.6778,-175.4094,35,4.6,mb,,90,6.253,0.49,us,us70005aue,2019-09-20T13:05:44.040Z,156km SSW of `Ohonua, Tonga,earthquake,7.2,1.9,0.105,27,reviewed,us,us                                             ",
"2019-09-01T06:23:52.143Z,5.1648,125.2456,56.17,4.7,mb,,51,1.921,0.91,us,us70005atm,2019-09-20T08:33:36.438Z,35km SW of Sarangani, Philippines,earthquake,5.3,7.1,0.072,60,reviewed,us,us                                       ",
"2019-09-01T04:42:24.241Z,19.6027,145.1631,141.61,4.5,mb,,124,4.378,0.44,us,us70005ct0,2019-09-27T00:34:06.040Z,106km NNW of Agrihan, Northern Mariana Islands,earthquake,6,9.2,0.127,18,reviewed,us,us                         ",
"2019-09-01T04:32:26.138Z,59.1033,-136.9727,9.8,5,mww,,,,0.8,ak,ak019b7lpbt4,2019-09-29T04:42:39.884Z,88km W of Haines, Alaska,earthquake,,0.3,,,reviewed,ak,ak                                                                 ",
"2019-09-01T02:34:50.972Z,-49.8554,-114.7806,10,5.5,mww,,40,34.287,1.16,us,us70005arj,2019-09-27T00:24:26.170Z,Southern East Pacific Rise,earthquake,14.2,1.8,0.061,26,reviewed,us,us                                           ",
"2019-08-31T23:54:40.947Z,-50.0035,-114.4669,10,5.7,mww,,64,26.489,0.51,us,us70005aqu,2019-09-07T04:29:04.227Z,Southern East Pacific Rise,earthquake,14.2,1.8,0.059,28,reviewed,us,us                                           ",
"2019-08-31T23:48:38.752Z,9.3016,126.3287,68.27,4.7,mb,,114,2.338,1.02,us,us70005aqm,2019-09-07T04:05:43.040Z,15km ENE of Burgos, Philippines,earthquake,7.8,5.1,0.076,52,reviewed,us,us                                        ",
"2019-08-31T23:46:04.506Z,24.8187,122.2422,10.68,4.5,mb,,71,0.782,0.71,us,us70005aqn,2019-09-07T03:59:00.040Z,46km ENE of Su'ao, Taiwan,earthquake,2.8,5.2,0.131,17,reviewed,us,us                                              ",
"2019-08-31T17:33:53.622Z,-60.207,-26.2955,10,4.9,mb,,66,8.105,1.18,us,us70005an0,2019-09-02T16:55:48.040Z,131km S of Bristol Island, South Sandwich Islands,earthquake,12.1,1.9,0.092,40,reviewed,us,us                        ",
"2019-08-31T15:09:21.811Z,22.7269,95.5099,10,5.5,mww,,31,1.766,0.55,us,us70005alm,2019-09-03T15:12:52.040Z,26km NW of Shwebo, Burma,earthquake,6.1,1.8,0.069,20,reviewed,us,us                                                  ",
"2019-08-31T13:02:20.286Z,7.5176,126.6432,58.96,5.1,mww,,71,1.145,0.76,us,us70005al7,2019-09-06T10:38:10.514Z,9km NE of Baculin, Philippines,earthquake,7.4,5,0.071,19,reviewed,us,us                                           ",
"2019-08-31T12:28:49.376Z,-32.4143,-178.3007,10,4.5,mb,,166,3.175,0.55,us,us70005cdh,2019-09-23T10:07:55.040Z,122km SSE of L'Esperance Rock, New Zealand,earthquake,15.2,1.9,0.145,14,reviewed,us,us                            ",
"2019-08-31T12:00:06.168Z,2.7383,-84.3527,10,4.6,mb,,77,6.239,0.53,us,us70005akv,2019-09-24T12:56:40.040Z,Off the coast of Central America,earthquake,8.1,1.9,0.038,212,reviewed,us,us                                          ",
"2019-08-31T11:23:20.185Z,-21.3334,169.8716,31.49,4.5,mb,,130,2.586,0.23,us,us70005cdk,2019-09-23T06:42:33.040Z,207km E of Tadine, New Caledonia,earthquake,12.1,7.9,0.163,11,reviewed,us,us                                    ",
"2019-08-31T08:45:14.180Z,19.1518,-63.9471,7,4.9,ml,23,221,1.405,0.71,pr,pr2019243005,2019-09-22T08:43:51.040Z,90km NE of Road Town, British Virgin Islands,earthquake,4.44,2.98,0.38,21,reviewed,pr,pr                         ",
"2019-08-31T07:50:18.459Z,23.0237,121.7202,14.26,4.8,mb,,92,0.624,0.67,us,us70005aim,2019-09-22T08:32:00.040Z,65km ENE of Taitung City, Taiwan,earthquake,4.4,5.2,0.089,39,reviewed,us,us                                       ",
"2019-08-31T07:42:32.843Z,6.1797,126.4912,37.03,4.6,mb,,114,1.266,0.5,us,us70005ail,2019-09-22T08:30:56.040Z,40km ESE of Pondaguitan, Philippines,earthquake,6,8.2,0.125,19,reviewed,us,us                                      ",
"2019-08-31T06:40:36.025Z,42.4841,89.3078,10,4.5,mb,,50,6.603,0.75,us,us70005ai7,2019-09-22T08:26:54.040Z,51km SSE of Turpan, China,earthquake,8.9,1.8,0.124,19,reviewed,us,us                                                  ",
"2019-08-31T06:30:52.107Z,-21.201,170.0056,36.63,4.8,mb,,94,2.76,0.5,us,us70005ai6,2019-09-22T08:24:45.040Z,198km SSE of Isangel, Vanuatu,earthquake,10.7,7.8,0.098,32,reviewed,us,us                                           ",
"2019-08-31T04:56:35.796Z,-22.895,-177.0337,116.63,4.5,mb,,119,6.892,1.09,us,us70005cd8,2019-09-06T01:50:03.040Z,266km SW of Vaini, Tonga,earthquake,15.6,8.5,0.172,10,reviewed,us,us                                           ",
"2019-08-31T03:10:22.061Z,19.531,144.3839,10,4.8,mb,,140,17.785,0.82,us,us70005ah1,2019-09-27T00:13:44.040Z,123km SSW of Farallon de Pajaros, Northern Mariana Islands,earthquake,8.5,1.8,0.065,103,reviewed,us,us              ",
"2019-08-31T01:15:05.006Z,-8.6528,119.567,152.1,4.5,mb,,123,2.64,1.06,us,us70005agk,2019-09-27T00:01:12.040Z,10km SE of Komodo, Indonesia,earthquake,5.7,11.6,0.314,3,reviewed,us,us                                            ",
"2019-08-30T20:37:21.885Z,-29.7393,-69.3807,121.84,4.6,mb,,49,0.663,0.75,us,us70005ae6,2019-08-31T15:37:46.515Z,82km NW of San Jose de Jachal, Argentina,earthquake,6.8,5.8,0.074,55,reviewed,us,us                             ",
"2019-08-30T17:21:04.269Z,37.5226,26.8158,5.22,4.5,mwr,,29,1.674,0.72,us,us70005abi,2019-09-02T07:12:40.410Z,21km SSW of Chora, Greece,earthquake,4.2,4.5,0.08,15,reviewed,us,us                                                ",
"2019-08-30T15:38:14.496Z,37.4855,26.8329,10,4.6,mb,,36,1.636,0.94,us,us70005a9c,2019-09-05T22:20:18.040Z,25km SSW of Chora, Greece,earthquake,4.2,1.9,0.065,70,reviewed,us,us                                                  "

    ];
}


function setup() {
  
  let refreshBtn = createButton('Refresh');
  frameRateVal = createSlider(1, 50, 5);
  dat_tab = $('#eq_dat_tab_id').DataTable({
        "columnDefs": [
            {
                "targets": [ 0 ],
                "visible": false,
                "searchable": false
            }
        ],
        "scrollY":        "400px",
        "scrollCollapse": true,
        "paging":         false
  });
  
  var myCanvas = createCanvas(1024, 512);
  myCanvas.parent("canvasContainer");
  
  var cx = mercX(clon,1);
  var cy = mercY(clat,1);
  
  for(let earthquake_item of earthquake_list.reverse()){
    data = earthquake_item.split(/,/);
    
    let eq_lat = data[1];
    let eq_lon = data[2];
    let orig_mag = data[4];
    let place = data[13];
    let mag = data[4];
    
    mag = sqrt(pow(10, mag));
    let magmax = sqrt(pow(10, 10));
    
    let d = map(mag, 0, magmax, 0, 180*8);
    
    let eq_x = mercX(eq_lon,1) - cx;
    let eq_y = mercY(eq_lat,1) - cy;
    
    earthquakes.push(new Earthquake(eq_lon,eq_lat,orig_mag, place, eq_x,eq_y,d));
    
    
  }
  
  refreshBtn.mousePressed(refresh);
  
  earthquakeReportChartData = [0, 0, 0, 0, 0, 0] ;
  createEarthquakeReportBarChart(earthquakeReportChartData);

  socket = io.connect('http://localhost:3000');
  let tickerP = createP('News Flash').addClass('marquee');
  tickerP.parent("ticker");
  tickerP.style('background-color', color(150, 0, 0, 50));
  socket.on('news', (data) => {
    if(tickerP != null){
      tickerP.remove();
    }
    tickerP = createP(data.newsItem).addClass('marquee');
    tickerP.parent("ticker");
    tickerP.style('background-color', color(150, 0, 0, 50));
    // <p class="microsoft marquee">Windows 8 and Windows RT </p>
    console.log(data);
  });

  bgMusic = loadSound("David_Hilowitz_-_Gradual_Sunrise.mp3", bgMusicLoaded);
}

function refresh(){
  idx = 0;
  earthquakes.map(function(x) { 
    x.enable = false; 
    return x
  });
}

function bgMusicLoaded(){
  playBgMusicBtn = createButton('Play');
  playBgMusicBtn.mousePressed(play_pause_BgMusic);
  //bgMusic.play();
}

function play_pause_BgMusic(){
  if(!bgMusic.isPlaying()){
    bgMusic.play();
    playBgMusicBtn.html('Pause');
  } else {
    bgMusic.pause();
    playBgMusicBtn.html('Play');
  }
  
}

function draw() {
  //background(220);
  
  frameRate(frameRateVal.value());
  translate(width/2, height/2);
  imageMode(CENTER);
  image(img, 0, 0);
  
  if(idx < earthquakes.length){
    earthquakes[idx].enable = true;
    if(idx != 0 && idx != earthquakes.length - 1){
      var counter = 0;
      dat_tab.row.add( [
            idx,
            earthquakes[idx].lon,
            earthquakes[idx].lat,
            earthquakes[idx].orig_mag,
            earthquakes[idx].place
        ] ).order( [ 0, 'desc' ] ).draw( false );
      updateEarthquakeReportBarChart(earthquakes[idx].orig_mag);
    }
    
    idx++;
  }
  
  for(let earthquake of earthquakes){
    earthquake.show();
  }
}

function mercX(lon, zoom){
  lon = radians(lon);
  return (256/PI) * pow(2, zoom) * (lon + PI)
}

function mercY(lat, zoom){
  lat = radians(lat);
  return (256/PI) * pow(2, zoom) * (PI - log(tan(PI/4 + lat/2)));
}


function updateEarthquakeReportBarChart(orig_mag){
  
  if(orig_mag >= 4.5 && orig_mag < 5) {
    earthquakeReportChart.data.datasets[0].data[0]+=1;
  } else if(orig_mag >= 5 && orig_mag < 5.5) {
    earthquakeReportChart.data.datasets[0].data[1]+=1;
  } else if(orig_mag >= 5.5 && orig_mag < 6) {
    earthquakeReportChart.data.datasets[0].data[2]+=1;
  } else if(orig_mag >= 6 && orig_mag < 6.5) {
    earthquakeReportChart.data.datasets[0].data[3]+=1;
  } else if(orig_mag >= 6.5 && orig_mag < 7) {
    earthquakeReportChart.data.datasets[0].data[4]+=1;
  } else {
    earthquakeReportChart.data.datasets[0].data[5]+=1;
  }
  
  earthquakeReportChart.update();
}

function createEarthquakeReportBarChart(eq_data){
  var ctx = document.getElementById('earthquakeReportChart').getContext('2d');
  earthquakeReportChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['4.5 - 5.0', '5.0 - 5.5', '5.5 - 6.0', '6.0 - 6.5', '6.5 - 7.0', ' < 7.0'],
        datasets: [{
            label: '# of Earthquaks',
            data: eq_data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}