#include<stdio.h>

void selsort(int arr[],int n){

    for(int i=0;i<n-1;i++){
       int minind=i;

        for(int j=i+1;j<n;j++){
            if(arr[j]<arr[minind]){
                minind=j;
            }
        }

        int temp=arr[i];
        arr[i]=arr[minind]
        arr[minind]=temp;
    }