#read from csv file
import pandas as pd;
df = pd.read_csv("data_for_test3.csv");

#Data Cleaning

#Kilometraža - nakon preuzimanja podataka hiljade su napisane sa tackom 300.000 i ovo je detektovano kao 300.0 samim tim da bi popravila ovaj problem pomozene su sa 1000
df.Kilometraža = df.Kilometraža * 1000

#size of data frame
print("Rows", df.shape[0]) #48789 
print("Cols", df.shape[1]) #156

#Columns that have NULL values
nan_cols = [i for i in df.columns if df[i].isnull().any()]
print(nan_cols)
#['Model', 'Godište', 'Kilometraža', 'Karoserija', 'Gorivo', 'Snaga motora', 'Zamena', 'Plivajući zamajac', 'Emisiona klasa motora', 'Pogon', 'Menjač', 'Broj vrata', 'Broj sedišta', 'Strana volana', 'Klima', 'Boja', 'Materijal enterijera', 'Boja enterijera', 'Registrovan do', 'Vlasništvo', 'Oštećenje', 'description']


print("Model", df['Model'].isnull().sum())                                      #Model 8
print("Godište", df['Godište'].isnull().sum())                                  #Godište 1
print("Kilometraža", df['Kilometraža'].isnull().sum())                          #Kilometraža 225
print("Karoserija", df['Karoserija'].isnull().sum())                            #Karoserija 2
print("Gorivo", df['Gorivo'].isnull().sum())                                    #Gorivo 1
print("Snaga motora", df['Snaga motora'].isnull().sum())                        #Snaga motora 1
print("Zamena", df['Zamena'].isnull().sum())                                    #Zamena 7692
print("Plivajući zamajac", df['Plivajući zamajac'].isnull().sum())              #Plivajući zamajac 32419
print("Emisiona klasa motora", df['Emisiona klasa motora'].isnull().sum())      #Emisiona klasa motora 2
print("Pogon", df['Pogon'].isnull().sum())                                      #Pogon 1
print("Menjač", df['Menjač'].isnull().sum())                                    #Menjač 1
print("Broj vrata", df['Broj vrata'].isnull().sum())                            #Broj vrata 2
print("Broj sedišta", df['Broj sedišta'].isnull().sum())                        #Broj sedišta 1
print("Strana volana", df['Strana volana'].isnull().sum())                      #Strana volana 1
print("Klima", df['Klima'].isnull().sum())                                      #Klima 2
print("Boja", df['Boja'].isnull().sum())                                        #Boja 2
print("Materijal enterijera", df['Materijal enterijera'].isnull().sum())        #Materijal enterijera 6900
print("Boja enterijera", df['Boja enterijera'].isnull().sum())                  #Boja enterijera 8451
print("Registrovan do", df['Registrovan do'].isnull().sum())                    #Registrovan do 5
print("Vlasništvo", df['Vlasništvo'].isnull().sum())                            #Vlasništvo 16749
print("Oštećenje", df['Oštećenje'].isnull().sum())                              #Oštećenje 1
print("description", df['description'].isnull().sum())                          #description 3146


#izbacivanje celih kolona koje imaju nekoliko hiljada linija null vrednosti
df.drop(columns=['Vlasništvo', 'Plivajući zamajac', 'description', 'Zamena', 'Materijal enterijera', 'Boja enterijera'], axis=1, inplace=True)

#izbacivanje redova sa null vrednostima
df.dropna(subset = ['Model','Godište','Kilometraža','Karoserija','Gorivo','Snaga motora','Emisiona klasa motora','Pogon','Menjač','Broj vrata','Broj sedišta','Strana volana','Klima','Boja','Registrovan do','Oštećenje'], inplace=True)

#size of data frame after procesing
print("Rows", df.shape[0]) #48546 
print("Cols", df.shape[1]) #150

#Divide data into train valid test 80 10 10
train_size = 0.8
valid_size=0.1
train_index = int(len(df)*train_size)
train_index 

df_train = df[0:train_index] #0 do 39 031

valid_index = int(len(df)*valid_size)
valid_index 

df_valid = df[train_index:train_index+valid_index] #od 39 031 do 39031+valid index (4878)
df_test = df[train_index+valid_index:] #od 39031+4878 do kraja



