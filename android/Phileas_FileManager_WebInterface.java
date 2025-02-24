import android.content.Context;
import android.os.Environment;
import android.util.Base64;
import android.webkit.JavascriptInterface;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

public class WebAppInterface {
    private Context context;

    public WebAppInterface(Context context) {
        this.context = context;
    }

    @JavascriptInterface
    public void saveBase64File(String relativePath, String base64Data) {
        try {
            byte[] decodedBytes = Base64.decode(base64Data, Base64.DEFAULT);
            File path = new File(context.getFilesDir(), relativePath);
            path.getParentFile().mkdirs();

            FileOutputStream fos = new FileOutputStream(path);
            fos.write(decodedBytes);
            fos.close();

            System.out.println("📂 Save file imported: " + path.getAbsolutePath());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}



// Add to MainActivity.java:
myWebView.addJavascriptInterface(new WebAppInterface(this), "Android");
