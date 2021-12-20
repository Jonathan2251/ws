int c = 0;

void dev_func(int a, int b) {
  int c = 0;
  int x = a + b;
  async {
    c = x + a;
  }
  async {
    c = x * b;
  }
}
