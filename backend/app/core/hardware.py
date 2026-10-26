"""
Hardware detection utility for Adaptive AI Tutor.
Inspects system CPU, RAM, and GPU / VRAM to verify local execution constraints
without assuming or inventing specifications.
"""

import platform
import os
import psutil

def detect_hardware_profile() -> dict:
    profile = {
        "os": f"{platform.system()} {platform.release()}",
        "architecture": platform.machine(),
        "cpu_count_logical": psutil.cpu_count(logical=True),
        "cpu_count_physical": psutil.cpu_count(logical=False),
        "ram_total_gb": round(psutil.virtual_memory().total / (1024 ** 3), 2),
        "ram_available_gb": round(psutil.virtual_memory().available / (1024 ** 3), 2),
        "gpu_detected": False,
        "gpu_name": "None / Integrated",
        "vram_gb": 0.0,
        "execution_recommendation": "Use lightweight models or local fallback provider"
    }

    # Attempt to detect GPU using Windows WMI or PyTorch if available
    try:
        import subprocess
        result = subprocess.run(
            ["powershell", "-Command", "Get-CimInstance Win32_VideoController | Select-Object -Property Name, AdapterRAM | ConvertTo-Json"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0 and result.stdout.strip():
            import json
            data = json.loads(result.stdout)
            controllers = data if isinstance(data, list) else [data]
            gpu_names = []
            max_vram = 0
            for c in controllers:
                name = c.get("Name", "Unknown")
                gpu_names.append(name)
                ram = c.get("AdapterRAM") or 0
                if ram and ram > max_vram:
                    max_vram = ram
            
            profile["gpu_detected"] = len(gpu_names) > 0
            profile["gpu_name"] = ", ".join(gpu_names)
            profile["vram_gb"] = round(max_vram / (1024 ** 3), 2)
    except Exception as e:
        profile["gpu_name"] = f"Detection error: {str(e)}"

    # Check CUDA availability
    try:
        import torch
        if torch.cuda.is_available():
            profile["cuda_available"] = True
            profile["cuda_device_name"] = torch.cuda.get_device_name(0)
            profile["cuda_vram_gb"] = round(torch.cuda.get_device_properties(0).total_memory / (1024 ** 3), 2)
        else:
            profile["cuda_available"] = False
    except ImportError:
        profile["cuda_available"] = False
        profile["cuda_status"] = "PyTorch CUDA not installed; running on CPU."

    if profile.get("cuda_available") and profile.get("cuda_vram_gb", 0) >= 4:
        profile["execution_recommendation"] = "Capable of running 1B-3B quantized local LLMs (e.g. Llama 3.2 1B/3B, Qwen 2.5 1.5B) or cloud APIs."
    else:
        profile["execution_recommendation"] = "Recommended: Cloud API (Gemini/OpenAI) or deterministic offline fallback with fast CPU RAG."

    return profile

if __name__ == "__main__":
    import pprint
    pprint.pprint(detect_hardware_profile())
