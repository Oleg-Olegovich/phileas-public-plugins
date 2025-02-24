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

    public void saveToDownloads(String fileName, String jsonData) {
        try {
            byte[] decodedBytes = jsonData.getBytes("UTF-8");

            ContentValues values = new ContentValues();
            values.put(MediaStore.MediaColumns.DISPLAY_NAME, fileName);
            values.put(MediaStore.MediaColumns.MIME_TYPE, "application/json");
            values.put(MediaStore.MediaColumns.RELATIVE_PATH, "Download/");

            Uri uri = context.getContentResolver().insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);

            if (uri != null) {
                OutputStream outputStream = context.getContentResolver().openOutputStream(uri);
                outputStream.write(decodedBytes);
                outputStream.close();
                System.out.println("Файл сохранён в Downloads: " + uri.toString());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Ошибка при сохранении файла: " + e.getMessage());
        }
    }
}



// Add to MainActivity.java:
myWebView.addJavascriptInterface(new WebAppInterface(this), "Android");
