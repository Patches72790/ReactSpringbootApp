package com.characterviewer.RequestObjects;

import java.util.ArrayList;

public class JSONArray {
    ArrayList<String> data;

    JSONArray(ArrayList<String> data) {
        this.data = data;
    }

    public ArrayList<String> getData() {
        return data;
    }

    public void setData(ArrayList<String> data) {
        this.data = data;
    }
}
