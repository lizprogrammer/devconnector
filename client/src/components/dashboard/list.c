#include<stdio.h>
#include<stdlib.h>

typedef struct Node
{
  int data;
  struct Node *next;
} Node;

void push(int, struct Node*);
int pop(struct NOde*);
//int peek(struct NOde*);

int main(void)
{
  printf("Hello\n");
}
