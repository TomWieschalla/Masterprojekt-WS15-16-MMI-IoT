package de.bht.mmi.iot.model.rest;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAutoGeneratedKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMarshalling;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import de.bht.mmi.iot.converter.JodaDateTimeMarshaller;
import org.joda.time.DateTime;

import java.util.ArrayList;

@DynamoDBTable(tableName = "Cluster")
public class Cluster {

    private String id;

    private String name;

    private DateTime creationDate;

    private String gatewayName;

    private ArrayList<String> sensorList;

    public Cluster() {
        this.creationDate = new DateTime();
    }

    public Cluster(String name, String gatewayName, ArrayList<String> sensorList) {
        this.name = name;
        this.gatewayName = gatewayName;
        this.sensorList = sensorList;
        this.creationDate = new DateTime();
    }

    @DynamoDBHashKey(attributeName = "id")
    @DynamoDBAutoGeneratedKey
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @DynamoDBMarshalling(marshallerClass = JodaDateTimeMarshaller.class)
    public DateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(DateTime creationDate) {
        this.creationDate = creationDate;
    }

    public String getGatewayName() {
        return gatewayName;
    }

    public void setGatewayName(String gatewayName) {
        this.gatewayName = gatewayName;
    }

    public ArrayList<String> getSensorList() {
        return sensorList;
    }

    public void setSensorList(ArrayList<String> sensorList) {
        this.sensorList = sensorList;
    }
}
