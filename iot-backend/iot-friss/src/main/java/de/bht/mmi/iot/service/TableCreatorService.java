package de.bht.mmi.iot.service;

import java.util.ArrayList;

public interface TableCreatorService {

    final String TABLENAME_USER = "User";
    final String TABLENAME_SENSOR = "Sensor";
    final String TABLENAME_GATEWAY = "Gateway";

    String createUserTable();

    String createSensorTable();

    String createGatewayTable();

    ArrayList<String> getTableNames();

    void deleteTable(String tableName);

}
