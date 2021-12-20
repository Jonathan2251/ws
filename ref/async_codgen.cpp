// clang++ -O3 -emit-llvm async_codgen.cpp

extern int USharpId();

int c = 0;

void dev_func(int a, int b) {
  int x = a + b;
  int uSharpId = USharpId();
  if (uSharpId == 1) {
    c = x + a;
  }
  else if (uSharpId == 2) {
    c = x * b;
  }
}
