import pandas as pd
import numpy as np

# Function to generate random data for the dataset
def generate_ckd_data(num_records):
    data = []
    for _ in range(num_records):
        age = np.random.randint(5, 100)
        gender = np.random.choice(['Male', 'Female'])
        creatinine_levels = np.random.uniform(0, 1.5)
        egfr = np.random.uniform(0, 120)
        bun = np.random.uniform(5, 40)
        al = np.random.uniform(2, 50)
        diabetis = np.random.uniform(2, 50)
        
        # Determine CKD stage based on eGFR
        if egfr >= 90:
            stage = "Stage 1 Mild Kidney Damage"
        elif egfr >= 60:
            stage = "Stage 2 Mild Kidney Damage"
        elif egfr >= 45:
            stage = "Stage 3a Moderate Kidney Damage"
        elif egfr >= 30:
            stage = "Stage 3b Moderate to Severe Kidney Damage"
        elif egfr >= 15:
            stage = "Stage 4 Severe Kidney Damage"
        else:
            stage = "Stage 5 Most Severe Kidney Damage"
        
        data.append([age, gender, creatinine_levels, egfr, bun, al, diabetis, stage])
    
    columns = ['Age', 'Gender', 'Creatinine Levels', 'eGFR', 'BUN', 'Albumin', 'Diabetis', 'CKD Stage']
    df = pd.DataFrame(data, columns=columns)
    
    return df

# Generate three datasets with 500 records each
dataset1 = generate_ckd_data(500)
dataset2 = generate_ckd_data(500)
dataset3 = generate_ckd_data(500)

# Save the datasets to CSV files
dataset1.to_csv('ckd_dataset1.csv', index=False)
dataset2.to_csv('ckd_dataset2.csv', index=False)
dataset3.to_csv('ckd_dataset3.csv', index=False)

print("Datasets saved to 'ckd_dataset1.csv', 'ckd_dataset2.csv', and 'ckd_dataset3.csv'")
