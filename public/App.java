package com.mycompany.app;

/**
 * Hello world!
 */
public class App {

    void f() {
        x = 0;
        if (d > 1) {
            y = 3;
            z = 2;
        } else {
            h = 2;
            z = 1;
            y = 3;
        }

        x = 0;
        if (d > 2) {
            y = 3;
            z = 2;
        } else {
            h = 2;
            f = 1;
            y = 3;
        }

        x = 0;
        if (f > 3) {
            y = 3;
            z = 2;
        } else {
            h = 2;
            z = 1;
            y = 3;
        }
    }

    @Test
    public void testApp() {
        App classUnderTest = new App();
        assertEquals("Hello world!", classUnderTest.f());
        x = 0;
        if (d > 3) {
            b = 3;
            z = 2;
        } else {
            h = 2;
            z = 1;
            y = 3;
        }
        App classUnderTest = new App();
        assertEquals("Hello world!", classUnderTest.f());
        x = 0;
        if (d > 3) {
            b = 3;
            z = 2;
        } else {
            h = 2;
            d = 1;
            y = 3;
        }
    }
}
