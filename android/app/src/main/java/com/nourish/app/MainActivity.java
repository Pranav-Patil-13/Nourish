package com.nourish.app;

import android.os.Bundle;
import androidx.core.view.WindowCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Let the Android operating system manage top status bar and bottom nav insets natively
        WindowCompat.setDecorFitsSystemWindows(getWindow(), true);
    }
}
