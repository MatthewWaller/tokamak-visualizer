import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def generate_tokamak_data(start_time=0, end_time=5000, time_step=1):
    # Generate time array
    time = np.arange(start_time, end_time + time_step, time_step, dtype=float)
    
    # Generate plasma current (ip) data
    ip_max = 1.5e6  # Maximum plasma current in Amperes
    ip_ramp_up_time = 500  # Time to reach maximum current
    ip_flat_top_time = 4000  # Duration of flat-top phase
    ip = np.piecewise(time, 
                      [time < ip_ramp_up_time, 
                       (time >= ip_ramp_up_time) & (time < ip_flat_top_time), 
                       time >= ip_flat_top_time],
                      [lambda t: ip_max * t / ip_ramp_up_time, 
                       lambda t: ip_max, 
                       lambda t: ip_max * (1 - (t - ip_flat_top_time) / (end_time - ip_flat_top_time))])
    
    # Add some noise to ip (now ip is guaranteed to be float)
    ip += np.random.normal(0, 0.02 * ip_max, len(time))
    
    # Generate kappa data (elongation factor)
    kappa_mean = 1.7
    kappa_variation = 0.1
    kappa = kappa_mean + kappa_variation * np.sin(2 * np.pi * time / 1000) + np.random.normal(0, 0.02, len(time))
    
    # Generate density data
    density_max = 1e20  # Maximum density in m^-3
    density_ramp_up_time = 1000  # Time to reach maximum density
    density = np.piecewise(time, 
                           [time < density_ramp_up_time, time >= density_ramp_up_time],
                           [lambda t: density_max * t / density_ramp_up_time, 
                            lambda t: density_max + np.random.normal(0, 0.05 * density_max, len(t))])
    
    # Create DataFrame
    df = pd.DataFrame({
        'Time (ms)': time,
        'Plasma Current (A)': ip,
        'Kappa': kappa,
        'Density (m^-3)': density
    })
    
    return df

# Generate data
data = generate_tokamak_data()

# Save to CSV
data.to_csv('tokamak_data.csv', index=False)

print("Data has been saved to 'tokamak_data.csv'")

# Optional: Plot the data
plt.figure(figsize=(12, 8))
plt.subplot(3, 1, 1)
plt.plot(data['Time (ms)'], data['Plasma Current (A)'])
plt.title('Plasma Current')
plt.ylabel('Current (A)')

plt.subplot(3, 1, 2)
plt.plot(data['Time (ms)'], data['Kappa'])
plt.title('Kappa (Elongation Factor)')
plt.ylabel('Kappa')

plt.subplot(3, 1, 3)
plt.plot(data['Time (ms)'], data['Density (m^-3)'])
plt.title('Plasma Density')
plt.xlabel('Time (ms)')
plt.ylabel('Density (m^-3)')

plt.tight_layout()
plt.show()